import { Context } from "../../context";

export async function isAuthWorkoutRecord(
  _root: any,
  args: { workoutRecordId: string },
  ctx: Context
): Promise<boolean> {
  if (!ctx.req.session.userId) {
    return false;
  }

  const workoutRecord = await ctx.db.workoutRecord.findUnique({
    where: {
      id: args.workoutRecordId,
    },
  });

  if (!workoutRecord || ctx.req.session.userId !== workoutRecord.userId) {
    return false;
  }

  return true;
}
