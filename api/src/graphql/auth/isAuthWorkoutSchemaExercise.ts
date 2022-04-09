import { Context } from "../../context";

export async function isAuthWorkoutSchemaExercise(
  _root: any,
  args: { exerciseId: string },
  ctx: Context
): Promise<boolean> {
  if (!ctx.req.session.userId) {
    return false;
  }

  const exercise = await ctx.db.workoutSchemaExercise.findUnique({
    where: {
      id: args.exerciseId,
    },
    include: {
      workoutSchema: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!exercise || ctx.req.session.userId !== exercise.workoutSchema.user.id) {
    return false;
  }

  return true;
}
