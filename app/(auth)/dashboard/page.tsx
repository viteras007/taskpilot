import CardDash from "@/components/CardDash";
import { Check, Clock9, Pencil, Scan } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <CardDash
        cardName="Tasks Total"
        icon={<Pencil className="h-4 w-4" />}
        value="100"
        valueDescription="all tasks created"
      />
      <CardDash
        cardName="Tasks Done"
        icon={<Check className="h-4 w-4" />}
        value="80"
        valueDescription="tasks that are done in this month"
      />
      <CardDash
        cardName="Tasks Open"
        icon={<Scan className="h-4 w-4" />}
        value="20"
        valueDescription="tasks that are still open this month"
      />
      <CardDash
        cardName="Tasks Active For Today"
        icon={<Clock9 className="h-4 w-4" />}
        value="5"
        valueDescription="your tasks for today"
      />
    </div>
  );
}
