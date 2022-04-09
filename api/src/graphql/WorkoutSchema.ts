import { AuthenticationError, UserInputError } from "apollo-server-express";
import {
  extendType,
  idArg,
  inputObjectType,
  list,
  nonNull,
  objectType,
  stringArg,
} from "nexus";
import { isAuth } from "./auth/isAuth";

export const WorkoutSchemaExercise = objectType({
  name: "WorkoutSchemaExercise",
  definition(t) {
    t.nonNull.string("name");
    t.int("reps");
    t.float("weight");
    t.int("duration");
  },
});

export const WorkoutSchemaExerciseInput = inputObjectType({
  name: "WorkoutSchemaExerciseInput",
  definition(t) {
    t.nonNull.string("name");
    t.int("reps");
    t.float("weight");
    t.int("duration");
  },
});

export const WorkoutSchema = objectType({
  name: "WorkoutSchema",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("name");
    t.nonNull.field("user", {
      type: "User",
      async resolve(root, _args, ctx) {
        const user = await ctx.db.user.findFirst({
          where: {
            workoutSchemas: {
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
      type: "WorkoutSchemaExercise",
      async resolve(root, _args, ctx) {
        const exercises = await ctx.db.workoutSchemaExercise.findMany({
          where: {
            workoutSchema: {
              id: root.id,
            },
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

export const WorkoutSchemaQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("workoutSchemas", {
      type: "WorkoutSchema",
      authorize: isAuth,
      async resolve(_root, _args, ctx) {
        const workoutSchemas = await ctx.db.workoutSchema.findMany({
          where: {
            userId: ctx.req.session.userId,
          },
        });
        return workoutSchemas;
      },
    });
  },
});

export const WorkoutSchemaMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createWorkoutSchema", {
      type: "WorkoutSchema",
      authorize: isAuth,
      args: {
        name: nonNull(stringArg()),
      },
      async resolve(_root, { name }, ctx) {
        const workoutSchema = await ctx.db.workoutSchema.create({
          data: {
            userId: ctx.req.session.userId!,
            name,
          },
        });

        return workoutSchema;
      },
    });

    t.nonNull.field("updateWorkoutSchemaExercises", {
      type: "WorkoutSchema",
      authorize: isAuth,
      args: {
        id: nonNull(idArg()),
        exercises: nonNull(list(nonNull("WorkoutSchemaExerciseInput"))),
      },
      async resolve(_root, { id, exercises }, ctx) {
        const workoutSchema = await ctx.db.workoutSchema.findUnique({
          where: {
            id,
          },
        });

        if (!workoutSchema) {
          throw new UserInputError("WorkoutSchema not found");
        }

        if (workoutSchema.userId !== ctx.req.session.userId) {
          throw new AuthenticationError(
            "You are not authorized to delete this WorkoutSchema"
          );
        }

        const workoutSchemaUpdated = await ctx.db.workoutSchema.update({
          where: {
            id,
          },
          data: {
            exercises: {
              deleteMany: {},
              createMany: {
                data: exercises.map((exercise, index) => ({
                  ...exercise,
                  order: index,
                })),
              },
            },
          },
        });

        return workoutSchemaUpdated;
      },
    });

    t.nonNull.field("deleteWorkoutSchema", {
      type: "Boolean",
      authorize: isAuth,
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_root, { id }, ctx) {
        const workoutSchema = await ctx.db.workoutSchema.findFirst({
          where: {
            id,
          },
        });

        if (!workoutSchema) {
          throw new Error("WorkoutSchema not found");
        }

        if (workoutSchema.userId !== ctx.req.session.userId) {
          throw new Error(
            "You are not authorized to delete this WorkoutSchema"
          );
        }

        await ctx.db.workoutSchema.delete({
          where: {
            id,
          },
        });

        return true;
      },
    });
  },
});
