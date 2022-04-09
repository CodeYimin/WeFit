import { inputObjectType, objectType } from "nexus";

export const WorkoutRecordExercise = objectType({
  name: "WorkoutRecordExercise",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("name");
    t.nonNull.int("reps");
    t.nonNull.float("weight");
    t.nonNull.int("duration");
  },
});

export const WorkoutRecordExerciseInput = inputObjectType({
  name: "WorkoutRecordExerciseInput",
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.int("reps");
    t.nonNull.float("weight");
    t.nonNull.int("duration");
  },
});
