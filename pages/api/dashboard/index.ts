// pages/api/dashboard.ts

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/prismaClient";
import { Status } from "@prisma/client";
import { startOfMonth, endOfMonth, startOfDay, endOfDay } from "date-fns";
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

    const userEmail = session.user?.email!;

    if (req.method === "GET") {
      try {
        const totalTasks: number = await prisma.task.count({
          where: {
            email: userEmail,
          },
        });

        const totalTasksDoneThisMonth: number = await prisma.task.count({
          where: {
            email: userEmail,
            status: Status.DONE,
            created_at: {
              gte: startOfMonth(new Date()),
              lte: endOfMonth(new Date()),
            },
          },
        });

        const tasksOpenThisMonth: number = await prisma.task.count({
          where: {
            email: userEmail,
            status: Status.OPEN,
            created_at: {
              gte: startOfMonth(new Date()),
              lte: endOfMonth(new Date()),
            },
          },
        });

        const tasksCreatedTodayAndOpen: number = await prisma.task.count({
          where: {
            email: userEmail,
            status: Status.OPEN,
            created_at: {
              gte: startOfDay(new Date()),
              lte: endOfDay(new Date()),
            },
          },
        });

        const dashboardData = {
          totalTasks,
          totalTasksDoneThisMonth,
          tasksOpenThisMonth,
          tasksCreatedTodayAndOpen,
        };

        res.status(200).json(dashboardData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ error: "Error fetching dashboard data" });
      }
    } else {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error in API route:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
