import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export interface Session {
  userId?: string;
}

export interface Context {
  req: Request & { session: Session };
  res: Response;
  db: PrismaClient;
}
