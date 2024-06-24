import { NextApiRequest, NextApiResponse } from "next";
import { Task } from "@prisma/client";
import prisma from "@/prisma/prismaClient";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const session = await getServerSession(req, res, {});
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userEmail = session.user?.email;

  try {
    const task: Task | null = await prisma.task.findUnique({
      where: { id: String(id) },
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (req.method === "GET") {
      if (task.email !== userEmail) {
        return res
          .status(403)
          .json({ error: "Unauthorized access to this task" });
      } else {
        return res.status(200).json(task);
      }
    } else if (req.method === "PUT") {
      const { description, status } = req.body;
      if (task.email !== userEmail) {
        return res
          .status(403)
          .json({ error: "Unauthorized update of this task" });
      } else {
        const updatedTask: Task = await prisma.task.update({
          where: { id: String(id) },
          data: { description, status },
        });
        return res.status(200).json(updatedTask);
      }
    } else if (req.method === "DELETE") {
      if (task.email !== userEmail) {
        return res
          .status(403)
          .json({ error: "Unauthorized deletion of this task" });
      } else {
        await prisma.task.delete({
          where: { id: String(id) },
        });
        return res.status(204).end();
      }
    } else {
      return res
        .setHeader("Allow", ["GET", "PUT", "DELETE"])
        .status(405)
        .end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
