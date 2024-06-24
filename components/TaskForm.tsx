"use client";
import React, { useEffect } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Task } from "@/app/(auth)/task/columns";
import { createTask, updateTask } from "@/app/service/task.service";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";

const formSchema = z.object({
  description: z.string().min(3),
});

export type FormType = z.infer<typeof formSchema>;

export interface TaskFormProps {
  type: "new" | "edit";
  task?: Task;
}

export default function TaskForm({ type, task }: TaskFormProps) {
  const router = useRouter();
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });

  useEffect(() => {
    if (task) {
      form.setValue("description", task.description);
    }
  }, []);

  const handleSubmit = async (formData: FormType) => {
    if (type === "new") {
      try {
        await createTask(formData);
        toast({
          variant: "default",
          title: "Task created with success!",
        });
      } catch (e) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem to create task.",
        });
      }
    } else if (type === "edit" && task) {
      try {
        await updateTask(formData, task.id);
        toast({
          variant: "default",
          title: "Task updated with success!",
        });
      } catch (e) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem to update task.",
        });
      }
    }
    router.push("/task");
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl">
                {type === "edit" ? "Edit Task" : "Create Task"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Type the description here..."
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" type="button">
                <Link href="/task">Cancel</Link>
              </Button>
              <Button variant="default" type="submit">
                Save
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
