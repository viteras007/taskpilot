"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { Task, columns } from "./columns";
import {
  deleteTask,
  getAllTasks,
  updateTaskStatus,
} from "@/app/service/task.service";
import { toast } from "@/components/ui/use-toast";
import { Status } from "@/app/model/taskStatus.model";

export default function TasksPage() {
  const [data, setData] = useState<Task[]>([]);

  const fetchAndSetTasks = async () => {
    try {
      const tasks = await getAllTasks();
      setData(tasks);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem to get all tasks.",
      });
    }
  };

  useEffect(() => {
    fetchAndSetTasks();
  }, []);

  const handleDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      toast({
        variant: "default",
        title: "Task deleted with success!",
      });
      fetchAndSetTasks();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem to delete the task.",
      });
    }
  };

  const handleUpdateStatus = async (taskId: string, status: Status) => {
    try {
      await updateTaskStatus(taskId, status);
      toast({
        variant: "default",
        title: "Status updated with success!",
      });
      fetchAndSetTasks();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem to update the status.",
      });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns({ handleDelete, handleUpdateStatus })}
        data={data}
      />
    </div>
  );
}
