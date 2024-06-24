import { NextApiRequest, NextApiResponse } from "next";
import { Task, Status } from "@prisma/client";
import prisma from "@/prisma/prismaClient";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, {});
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userEmail = session.user?.email;

    if (req.method === "GET") {
      const tasks: Task[] = await prisma.task.findMany({
        where: {
          email: userEmail!,
        },
        orderBy: {
          created_at: "desc",
        },
      });
      return res.status(200).json(tasks);
    } else if (req.method === "POST") {
      const { description, status }: { description: string; status: Status } =
        req.body;
      const task: Task = await prisma.task.create({
        data: {
          description,
          status,
          email: userEmail!,
        },
      });
      return res.status(201).json(task);
    } else {
      return res
        .status(405)
        .json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error("Error in API route:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
