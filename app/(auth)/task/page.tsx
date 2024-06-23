"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { Task, columns } from "./columns";
import { deleteTask, getAllTasks } from "@/app/service/task.service";

export default function TasksPage() {
  const [data, setData] = useState<Task[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasks = await getAllTasks();
        setData(tasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      const tasks = await getAllTasks();
      setData(tasks);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns({ handleDelete })} data={data} />
    </div>
  );
}
