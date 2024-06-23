"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { Task, columns } from "./columns";
import { deleteTask, getAllTasks } from "@/app/service/task.service";
import { toast } from "@/components/ui/use-toast";

export default function TasksPage() {
  const [data, setData] = useState<Task[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasks = await getAllTasks();
        setData(tasks);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem to gel all tasks.",
        });
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      const tasks = await getAllTasks();
      toast({
        variant: "default",
        title: "Task deleted with success!",
      });
      setData(tasks);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem to delete the task.",
      });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns({ handleDelete })} data={data} />
    </div>
  );
}
