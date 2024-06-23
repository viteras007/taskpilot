import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

export interface CardDashProps {
  cardName: string;
  icon: React.ReactNode;
  value: string;
  valueDescription: string;
}

export default function CardDash({
  cardName,
  icon,
  value,
  valueDescription,
}: CardDashProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{cardName}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{valueDescription}</p>
      </CardContent>
    </Card>
  );
}
