"use client";
import TaskForm from "@/components/TaskForm";
import { getTask } from "@/app/service/task.service";
import { useEffect, useState } from "react";
import { Task } from "../../columns";
import { toast } from "@/components/ui/use-toast";

export default function EditTaskPage({ params }: { params: { id: string } }) {
  const [task, setTask] = useState<Task>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const task = await getTask(params.id);
        setTask(task);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem to get this task.",
        });
      }
    };

    fetchData();
  }, []);
  return <>{task && <TaskForm type="edit" task={task} />}</>;
}
