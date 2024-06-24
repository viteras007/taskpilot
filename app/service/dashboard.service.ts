import { DashboardData } from "../model/dashboard.model";

export async function getDashboardData(): Promise<DashboardData> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/`,
    {
      method: "GET",
      cache: "no-cache",
      next: { revalidate: 3600 },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const data: DashboardData = await response.json();
  return data;
}
