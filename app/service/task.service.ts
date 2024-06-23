import { FormType } from "@/components/TaskForm";
import { Task } from "../(auth)/task/columns";
import { Status } from "../model/taskStatus.model";

export async function getAllTasks(): Promise<Task[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/task/`, {
    method: "GET",
    headers: {
      "Cache-Control": "no-cache",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const data: Task[] = await response.json();
  return data;
}

export async function getTask(id: string): Promise<Task> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/task/${id}`,
    {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const data: Task = await response.json();
  return data;
}

export async function createTask(formData: FormType): Promise<Task> {
  const payload = {
    ...formData,
    status: "OPEN",
  };
  const response = await fetch(`/api/task`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }
  const data: Task = await response.json();
  return data;
}

export async function updateTask(
  formData: FormType,
  id: string
): Promise<Task> {
  const response = await fetch(`/api/task/${id}`, {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }
  const data: Task = await response.json();
  return data;
}

export async function deleteTask(id: string): Promise<string> {
  const response = await fetch(`/api/task/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
  return id;
}

export async function updateTaskStatus(
  id: string,
  status: Status
): Promise<Task> {
  const response = await fetch(`/api/task/${id}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to update task status");
  }
  const data: Task = await response.json();
  return data;
}
