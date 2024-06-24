"use client";
import { getDashboardData } from "@/app/service/dashboard.service";
import CardDash from "@/components/CardDash";
import { Check, Clock9, Pencil, Scan } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [
    {
      tasksCreatedTodayAndOpen,
      tasksOpenThisMonth,
      totalTasks,
      totalTasksDoneThisMonth,
    },
    setData,
  ] = useState({
    tasksCreatedTodayAndOpen: 0,
    tasksOpenThisMonth: 0,
    totalTasks: 0,
    totalTasksDoneThisMonth: 0,
  });

  const fetchAndSetData = async () => {
    const dashData = await getDashboardData();
    setData(dashData);
  };
  useEffect(() => {
    fetchAndSetData();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <CardDash
        cardName="Tasks Total"
        icon={<Pencil className="h-4 w-4" />}
        value={`${totalTasks}`}
        valueDescription="all tasks created"
      />
      <CardDash
        cardName="Tasks Done"
        icon={<Check className="h-4 w-4" />}
        value={`${totalTasksDoneThisMonth}`}
        valueDescription="tasks that are done in this month"
      />
      <CardDash
        cardName="Tasks Open"
        icon={<Scan className="h-4 w-4" />}
        value={`${tasksOpenThisMonth}`}
        valueDescription="tasks that are still open this month"
      />
      <CardDash
        cardName="Tasks Active For Today"
        icon={<Clock9 className="h-4 w-4" />}
        value={`${tasksCreatedTodayAndOpen}`}
        valueDescription="your tasks for today"
      />
    </div>
  );
}
