"use client";
import TaskForm from "@/components/TaskForm";
import { getTask } from "@/app/service/task.service";
import { useEffect, useState } from "react";
import { Task } from "../../columns";

export default function EditTaskPage({ params }: { params: { id: string } }) {
  const [task, setTask] = useState<Task>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const task = await getTask(params.id);
        setTask(task);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchData();
  }, []);
  return <>{task && <TaskForm type="edit" task={task} />}</>;
}
