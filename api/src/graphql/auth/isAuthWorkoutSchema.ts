import { Context } from "../../context";

export async function isAuthWorkoutSchema(
  _root: any,
  args: { workoutSchemaId: string },
  ctx: Context
): Promise<boolean> {
  if (!ctx.req.session.userId) {
    return false;
  }

  const workoutSchema = await ctx.db.workoutSchema.findUnique({
    where: {
      id: args.workoutSchemaId,
    },
  });

  if (!workoutSchema || ctx.req.session.userId !== workoutSchema.userId) {
    return false;
  }

  return true;
}
