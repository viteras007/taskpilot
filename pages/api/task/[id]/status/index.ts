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

  if (req.method === "PUT") {
    const { status } = req.body;
    try {
      const task: Task = await prisma.task.update({
        where: { id: String(id) },
        data: { status },
      });
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: "Error updating task status" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
