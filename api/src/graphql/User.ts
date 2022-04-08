import { extendType, idArg, nonNull, objectType } from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.id("id");
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
      resolve: async (_, { id }, ctx) => {
        return ctx.db.user.findUnique({
          where: { id },
        });
      },
    });
  },
});
