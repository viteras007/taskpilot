import { NextApiRequest, NextApiResponse } from "next";
import { Task, Status } from "@prisma/client";
import prisma from "@/prisma/prismaClient";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const task: Task | null = await prisma.task.findUnique({
        where: { id: String(id) },
      });

      if (!task) {
        res.status(404).json({ error: "Task not found" });
      } else {
        res.status(200).json(task);
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching task" });
    }
  } else if (req.method === "PUT") {
    const { description, status } = req.body;
    try {
      const task: Task = await prisma.task.update({
        where: { id: String(id) },
        data: { description, status },
      });
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: "Error updating task" });
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.task.delete({
        where: { id: String(id) },
      });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Error deleting task" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
