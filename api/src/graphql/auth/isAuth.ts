import { Context } from "../../context";

export function isAuth(_root: any, _args: any, ctx: Context): boolean {
  return !!ctx.req.session.userId;
}
