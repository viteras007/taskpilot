import React from "react";
import { DataTable } from "./data-table";
import { Task, columns } from "./columns";

async function getData(): Promise<Task[]> {
  return [
    {
      id: "a1b2c3d4",
      description: "Complete the project documentation",
      status: "open",
      created_at: new Date("2024-01-01T10:00:00Z"),
      updated_at: null,
    },
    {
      id: "e5f6g7h8",
      description: "Fix bugs in the login module",
      status: "done",
      created_at: new Date("2024-01-02T11:30:00Z"),
      updated_at: new Date("2024-01-03T08:45:00Z"),
    },
    {
      id: "i9j0k1l2",
      description: "Update user profile page",
      status: "close",
      created_at: new Date("2024-01-03T09:20:00Z"),
      updated_at: new Date("2024-01-04T12:00:00Z"),
    },
    {
      id: "m3n4o5p6",
      description: "Design new homepage layout",
      status: "open",
      created_at: new Date("2024-01-04T14:00:00Z"),
      updated_at: null,
    },
    {
      id: "q7r8s9t0",
      description: "Implement payment gateway integration",
      status: "done",
      created_at: new Date("2024-01-05T16:30:00Z"),
      updated_at: new Date("2024-01-06T10:15:00Z"),
    },
    {
      id: "u1v2w3x4",
      description: "Write unit tests for new features",
      status: "close",
      created_at: new Date("2024-01-06T09:45:00Z"),
      updated_at: new Date("2024-01-07T15:30:00Z"),
    },
    {
      id: "y5z6a7b8",
      description: "Optimize database queries",
      status: "open",
      created_at: new Date("2024-01-07T11:00:00Z"),
      updated_at: null,
    },
    {
      id: "c9d0e1f2",
      description: "Refactor the backend code",
      status: "done",
      created_at: new Date("2024-01-08T13:00:00Z"),
      updated_at: new Date("2024-01-09T17:45:00Z"),
    },
    {
      id: "g3h4i5j6",
      description: "Conduct code review session",
      status: "close",
      created_at: new Date("2024-01-09T15:30:00Z"),
      updated_at: new Date("2024-01-10T10:00:00Z"),
    },
    {
      id: "k7l8m9n0",
      description: "Set up CI/CD pipeline",
      status: "open",
      created_at: new Date("2024-01-10T08:00:00Z"),
      updated_at: null,
    },
    {
      id: "o1p2q3r4",
      description: "Deploy application to staging environment",
      status: "done",
      created_at: new Date("2024-01-11T10:30:00Z"),
      updated_at: new Date("2024-01-12T14:15:00Z"),
    },
    {
      id: "s5t6u7v8",
      description: "Prepare presentation for stakeholders",
      status: "close",
      created_at: new Date("2024-01-12T11:20:00Z"),
      updated_at: new Date("2024-01-13T09:40:00Z"),
    },
    {
      id: "w9x0y1z2",
      description: "Analyze performance metrics",
      status: "open",
      created_at: new Date("2024-01-13T12:00:00Z"),
      updated_at: null,
    },
    {
      id: "a3b4c5d6",
      description: "Research new frontend frameworks",
      status: "done",
      created_at: new Date("2024-01-14T14:30:00Z"),
      updated_at: new Date("2024-01-15T16:10:00Z"),
    },
    {
      id: "e7f8g9h0",
      description: "Update API documentation",
      status: "close",
      created_at: new Date("2024-01-15T09:00:00Z"),
      updated_at: new Date("2024-01-16T11:45:00Z"),
    },
  ];
}

export default async function TasksPage() {
  const data = await getData();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
