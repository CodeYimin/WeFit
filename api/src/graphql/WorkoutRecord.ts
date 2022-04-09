import { extendType, idArg, list, nonNull, objectType, stringArg } from "nexus";
import { isAuth } from "./auth/isAuth";

export const WorkoutRecord = objectType({
  name: "WorkoutRecord",
  definition(t) {
    t.nonNull.id("id");
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
  },
});

export const WorkoutRecordQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("workoutRecords", {
      type: "WorkoutRecord",
      authorize: isAuth,
      async resolve(_root, _args, ctx) {
        const workoutRecords = await ctx.db.workoutRecord.findMany({
          where: {
            userId: ctx.req.session.userId,
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
  },
});
