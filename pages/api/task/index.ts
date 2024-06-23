import { NextApiRequest, NextApiResponse } from "next";
import { Task, Status } from "@prisma/client";
import prisma from "@/prisma/prismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const tasks: Task[] = await prisma.task.findMany();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Error fetching tasks" });
    }
  } else if (req.method === "POST") {
    const { description, status }: { description: string; status: Status } =
      req.body;
    try {
      const task: Task = await prisma.task.create({
        data: {
          description,
          status,
        },
      });
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: "Error creating task" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
