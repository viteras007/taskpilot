"use client";
import React from "react";
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

const formSchema = z.object({
  description: z.string().min(3),
});

type formType = z.infer<typeof formSchema>;

export interface TaskFormProps {
  type: "new" | "edit";
}

export default function TaskForm({ type }: TaskFormProps) {
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });

  const handleSubmit = () => {
    // TODO: Create Task
    if (type === "new") {
    }
    // TODO: Update Task
    else if (type === "edit") {
    }
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
              <Button variant="outline">
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
