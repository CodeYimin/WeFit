import {
  extendType,
  idArg,
  inputObjectType,
  nonNull,
  objectType,
  stringArg,
} from "nexus";
import { isAuthWorkoutSchema } from "./auth/isAuthWorkoutSchema";
import { isAuthWorkoutSchemaExercise } from "./auth/isAuthWorkoutSchemaExercise";

export const WorkoutSchemaExercise = objectType({
  name: "WorkoutSchemaExercise",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("name");
    t.int("reps");
    t.float("weight");
    t.int("duration");
  },
});

export const WorkoutSchemaExerciseInput = inputObjectType({
  name: "WorkoutSchemaExerciseInput",
  definition(t) {
    t.string("name");
    t.int("reps");
    t.float("weight");
    t.int("duration");
  },
});

export const WorkoutSchemaExerciseMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("addWorkoutSchemaExercise", {
      type: "WorkoutSchemaExercise",
      authorize: isAuthWorkoutSchema,
      args: {
        workoutSchemaId: nonNull(idArg()),
        name: nonNull(stringArg()),
      },
      async resolve(_root, { workoutSchemaId, name }, ctx) {
        const numExercises = await ctx.db.workoutSchemaExercise.count({
          where: {
            workoutSchema: {
              id: workoutSchemaId,
            },
          },
        });

        const exercise = await ctx.db.workoutSchemaExercise.create({
          data: {
            workoutSchema: {
              connect: {
                id: workoutSchemaId,
              },
            },
            name,
            order: numExercises,
          },
        });

        return exercise;
      },
    });

    t.nonNull.field("updateWorkoutSchemaExercise", {
      type: "WorkoutSchemaExercise",
      authorize: isAuthWorkoutSchemaExercise,
      args: {
        exerciseId: nonNull(idArg()),
        data: nonNull("WorkoutSchemaExerciseInput"),
      },
      async resolve(_root, { exerciseId, data }, ctx) {
        const exercise = await ctx.db.workoutSchemaExercise.update({
          where: {
            id: exerciseId,
          },
          data: Object.fromEntries(
            Object.entries(data).map(([key, value]) => [
              key,
              value || undefined,
            ])
          ),
        });

        return exercise;
      },
    });

    t.nonNull.field("deleteWorkoutSchemaExercise", {
      type: "WorkoutSchemaExercise",
      authorize: isAuthWorkoutSchemaExercise,
      args: {
        exerciseId: nonNull(idArg()),
      },
      async resolve(_root, { exerciseId }, ctx) {
        const exercise = (await ctx.db.workoutSchemaExercise.findUnique({
          where: {
            id: exerciseId,
          },
          include: {
            workoutSchema: true,
          },
        }))!;

        ctx.db.workoutSchemaExercise.updateMany({
          where: {
            workoutSchema: {
              id: exercise.workoutSchema.id,
            },
            order: {
              gt: exercise.order,
            },
          },
          data: {
            order: {
              increment: -1,
            },
          },
        });

        const workoutSchema = await ctx.db.workoutSchema.update({
          where: {
            id: exercise.workoutSchema.id,
          },
          data: {
            exercises: {
              delete: {
                id: exerciseId,
              },
            },
          },
        });

        return workoutSchema;
      },
    });
  },
});
