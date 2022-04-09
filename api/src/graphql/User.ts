import { UserInputError } from "apollo-server-express";
import { hash, verify } from "argon2";
import { extendType, idArg, list, nonNull, objectType, stringArg } from "nexus";
import { COOKIE_NAME } from "../consts";
import { isAuth } from "./auth/isAuth";
import { FieldError } from "./FieldError";

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("username");
    t.nonNull.field("friends", {
      type: list(nonNull("User")),
      async resolve(root, _args, ctx) {
        const friends = await ctx.db.user.findMany({
          where: {
            friends: {
              some: {
                id: root.id,
              },
            },
          },
        });
        return friends;
      },
    });
    t.nonNull.field("incomingFriendRequests", {
      type: list(nonNull("User")),
      async resolve(root, _args, ctx) {
        const incomingFriendRequests = await ctx.db.user.findMany({
          where: {
            outgoingFriendRequests: {
              some: {
                id: root.id,
              },
            },
          },
        });

        return incomingFriendRequests;
      },
    });
    t.field("outgoingFriendRequests", {
      type: list(nonNull("User")),
      async resolve(root, _args, ctx) {
        const outgoingFriendRequests = await ctx.db.user.findMany({
          where: {
            incomingFriendRequests: {
              some: {
                id: root.id,
              },
            },
          },
        });

        return outgoingFriendRequests;
      },
    });
  },
});

export const UserAndErrorResponse = objectType({
  name: "UserAndErrorResponse",
  definition(t) {
    t.field("user", {
      type: "User",
    });
    t.list.nonNull.field("errors", {
      type: "FieldError",
    });
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("userById", {
      type: "User",
      args: {
        id: nonNull(idArg()),
      },
      async resolve(_root, { id }, ctx) {
        const user = await ctx.db.user.findFirst({
          where: { id },
        });
        if (!user) {
          throw new UserInputError("User not found");
        }
        return user;
      },
    });

    t.nonNull.field("me", {
      type: "User",
      authorize: isAuth,
      async resolve(_root, _args, ctx) {
        const user = await ctx.db.user.findUnique({
          where: { id: ctx.req.session.userId },
        });
        if (!user) {
          throw new UserInputError("User not found");
        }

        return user;
      },
    });
  },
});

export const PostMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("register", {
      type: "UserAndErrorResponse",
      args: {
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_root, { username, password }, ctx) {
        const validationErrors: FieldError[] = [];
        if (username.length < 3) {
          validationErrors.push({
            field: "username",
            message: "Username must be at least 3 characters",
          });
        }
        if (password.length < 3) {
          validationErrors.push({
            field: "password",
            message: "Password must be at least 3 characters long",
          });
        }
        if (validationErrors.length) {
          return { errors: validationErrors };
        }

        const existingUser = await ctx.db.user.findFirst({
          where: {
            username,
          },
        });

        if (existingUser) {
          return {
            errors: [{ field: "username", message: "Username already exists" }],
          };
        }

        const hashedPassword = await hash(password);
        const user = await ctx.db.user.create({
          data: {
            username,
            password: hashedPassword,
          },
        });

        ctx.req.session.userId = user.id;

        return { user };
      },
    });

    t.nonNull.field("login", {
      type: "UserAndErrorResponse",
      args: {
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_root, { username, password }, ctx) {
        const user = await ctx.db.user.findFirst({
          where: {
            username: {
              equals: username,
              mode: "insensitive",
            },
          },
        });

        if (!user) {
          return {
            errors: [{ field: "username", message: "Username not found" }],
          };
        }

        const valid = await verify(user.password, password);

        if (!valid) {
          return {
            errors: [{ field: "password", message: "Password is incorrect" }],
          };
        }

        ctx.req.session.userId = user.id;

        return { user };
      },
    });

    t.nonNull.field("logout", {
      type: "Boolean",
      resolve(_root, _args, ctx) {
        return new Promise((resolve, reject) => {
          ctx.req.session.destroy((err) => {
            if (err) {
              reject(false);
            } else {
              ctx.res.clearCookie(COOKIE_NAME);
              resolve(true);
            }
          });
        });
      },
    });

    t.nonNull.field("sendFriendRequest", {
      type: "User",
      authorize: isAuth,
      args: {
        username: nonNull(stringArg()),
      },
      async resolve(_root, { username }, ctx) {
        const toUser = await ctx.db.user.findFirst({
          where: { username },
          include: {
            friends: true,
          },
        });

        if (!toUser) {
          throw new UserInputError("User not found");
        }

        if (toUser.id === ctx.req.session.userId) {
          throw new UserInputError(
            "You can't send friend requests to yourself"
          );
        }

        if (
          toUser.friends.some((friend) => friend.id === ctx.req.session.userId)
        ) {
          throw new UserInputError("You are already friends with this user");
        }

        const updatedToUser = await ctx.db.user.update({
          where: { id: toUser.id },
          data: {
            incomingFriendRequests: {
              connect: {
                id: ctx.req.session.userId,
              },
            },
          },
        });

        return updatedToUser;
      },
    });

    t.nonNull.field("acceptFriendRequest", {
      type: "User",
      authorize: isAuth,
      args: {
        fromId: nonNull(idArg()),
      },
      async resolve(_root, { fromId }, ctx) {
        const fromUser = await ctx.db.user.findUnique({
          where: { id: fromId },
        });

        if (!fromUser) {
          throw new UserInputError("User not found");
        }

        const updatedFromUser = await ctx.db.user.update({
          where: { id: fromId },
          data: {
            outgoingFriendRequests: {
              disconnect: {
                id: ctx.req.session.userId,
              },
            },
            friends: {
              connect: {
                id: ctx.req.session.userId,
              },
            },
            friendsRelation: {
              connect: {
                id: ctx.req.session.userId,
              },
            },
          },
        });

        return updatedFromUser;
      },
    });

    t.nonNull.field("removeFriend", {
      type: "User",
      authorize: isAuth,
      args: {
        id: nonNull(idArg()),
      },
      async resolve(_root, { id }, ctx) {
        const user = await ctx.db.user.findUnique({
          where: { id },
        });

        if (!user) {
          throw new UserInputError("User not found");
        }

        const updatedUser = await ctx.db.user.update({
          where: { id },
          data: {
            friends: {
              disconnect: {
                id: ctx.req.session.userId,
              },
            },
            friendsRelation: {
              disconnect: {
                id: ctx.req.session.userId,
              },
            },
          },
        });

        return updatedUser;
      },
    });
  },
});
