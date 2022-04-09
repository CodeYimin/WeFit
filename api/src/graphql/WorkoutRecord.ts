import { extendType, idArg, list, nonNull, objectType, stringArg } from "nexus";
import { isAuth } from "./auth/isAuth";

export const WorkoutRecord = objectType({
  name: "WorkoutRecord",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("name");
    t.nonNull.id("workoutSchemaId");
    t.nonNull.list.nonNull.field("likedBy", {
      type: "User",
      async resolve(root, _args, ctx) {
        const users = await ctx.db.user.findMany({
          where: {
            likedWorkoutRecords: {
              some: {
                id: root.id,
              },
            },
          },
        });

        return users;
      },
    });
    t.nonNull.field("user", {
      type: "User",
      async resolve(root, _args, ctx) {
        const user = await ctx.db.user.findFirst({
          where: {
            workoutRecords: {
              some: {
                id: root.id,
              },
            },
          },
        });

        if (!user) {
          throw new Error("User not found");
        }

        return user;
      },
    });
    t.nonNull.list.nonNull.field("exercises", {
      type: "WorkoutRecordExercise",
      async resolve(root, _args, ctx) {
        const exercises = await ctx.db.workoutRecordExercise.findMany({
          where: {
            workoutRecordId: root.id,
          },
          orderBy: {
            order: "asc",
          },
        });
        return exercises;
      },
    });
    t.nonNull.field("createdAt", {
      type: "String",
      async resolve(root, _args, ctx) {
        const record = await ctx.db.workoutRecord.findUnique({
          where: { id: root.id },
        });

        return new Date(record!.createdAt).toISOString();
      },
    });
  },
});

export const WorkoutRecordQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("workoutRecordsByUserId", {
      type: "WorkoutRecord",
      args: {
        userId: nonNull(idArg()),
      },
      async resolve(_root, args, ctx) {
        const workoutRecords = await ctx.db.workoutRecord.findMany({
          where: {
            userId: args.userId,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        return workoutRecords;
      },
    });
    t.nonNull.list.nonNull.field("allWorkoutRecords", {
      type: "WorkoutRecord",
      authorize: isAuth,
      async resolve(_root, _args, ctx) {
        const workoutRecords = await ctx.db.workoutRecord.findMany({
          where: {
            OR: [
              { userId: ctx.req.session.userId },
              {
                user: {
                  friends: {
                    some: {
                      id: ctx.req.session.userId,
                    },
                  },
                },
              },
            ],
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        return workoutRecords;
      },
    });
  },
});

export const WorkoutRecordMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createWorkoutRecord", {
      type: "WorkoutRecord",
      authorize: isAuth,
      args: {
        workoutSchemaId: nonNull(idArg()),
        name: nonNull(stringArg()),
        exercises: nonNull(list(nonNull("WorkoutRecordExerciseInput"))),
      },
      async resolve(_root, args, ctx) {
        const workoutRecord = await ctx.db.workoutRecord.create({
          data: {
            name: args.name,
            userId: ctx.req.session.userId!,
            workoutSchemaId: args.workoutSchemaId,
            exercises: {
              createMany: {
                data: args.exercises.map((exercise, index) => ({
                  order: index,
                  ...exercise,
                })),
              },
            },
          },
        });

        return workoutRecord;
      },
    });

    t.nonNull.field("likeWorkoutRecord", {
      type: "WorkoutRecord",
      authorize: isAuth,
      args: {
        id: nonNull(idArg()),
      },
      async resolve(_root, args, ctx) {
        const user = await ctx.db.user.findUnique({
          where: { id: ctx.req.session.userId! },
          include: { likedWorkoutRecords: true },
        });

        if (user?.likedWorkoutRecords.some((record) => record.id === args.id)) {
          throw new Error("Already liked");
        }

        const workoutRecord = await ctx.db.workoutRecord.findUnique({
          where: { id: args.id },
        });

        if (!workoutRecord) {
          throw new Error("Workout record not found");
        }

        const updatedWorkoutRecord = await ctx.db.workoutRecord.update({
          where: { id: args.id },
          data: {
            likedBy: {
              connect: {
                id: ctx.req.session.userId!,
              },
            },
          },
        });

        return updatedWorkoutRecord;
      },
    });

    t.nonNull.field("unlikeWorkoutRecord", {
      type: "WorkoutRecord",
      authorize: isAuth,
      args: {
        id: nonNull(idArg()),
      },
      async resolve(_root, args, ctx) {
        const user = await ctx.db.user.findUnique({
          where: { id: ctx.req.session.userId! },
          include: { likedWorkoutRecords: true },
        });

        if (
          !user?.likedWorkoutRecords.some((record) => record.id === args.id)
        ) {
          throw new Error("Not liked");
        }

        const updatedWorkoutRecord = await ctx.db.workoutRecord.update({
          where: { id: args.id },
          data: {
            likedBy: {
              disconnect: {
                id: ctx.req.session.userId!,
              },
            },
          },
        });

        return updatedWorkoutRecord;
      },
    });
  },
});
