"use client";

const SUBSCRIBERS: { date: string; amount: number }[] = [
  { date: "2023-05-01", amount: 12000 },
  { date: "2023-05-02", amount: 12050 },
  { date: "2023-05-03", amount: 12120 },
  { date: "2023-05-04", amount: 12200 },
  { date: "2023-05-05", amount: 12300 },
  { date: "2023-05-06", amount: 12420 },
  { date: "2023-05-07", amount: 12500 },
  { date: "2023-05-08", amount: 12630 },
  { date: "2023-05-09", amount: 12700 },
  { date: "2023-05-10", amount: 12850 },
  { date: "2023-05-11", amount: 13000 },
  { date: "2023-05-12", amount: 13150 },
  { date: "2023-05-13", amount: 13300 },
  { date: "2023-05-14", amount: 13450 },
  { date: "2023-05-15", amount: 13600 },
  { date: "2023-05-16", amount: 13750 },
  { date: "2023-05-17", amount: 13920 },
  { date: "2023-05-18", amount: 14050 },
  { date: "2023-05-19", amount: 14200 },
  { date: "2023-05-20", amount: 14350 },
  { date: "2023-05-21", amount: 14500 },
  { date: "2023-05-22", amount: 14650 },
  { date: "2023-05-23", amount: 14800 },
  { date: "2023-05-24", amount: 14950 },
  { date: "2023-05-25", amount: 15100 },
  { date: "2023-05-26", amount: 15250 },
  { date: "2023-05-27", amount: 15400 },
  { date: "2023-05-28", amount: 15550 },
  { date: "2023-05-29", amount: 15700 },
  { date: "2023-05-30", amount: 15850 },
  { date: "2023-05-31", amount: 16000 },
];

import {
  TooltipChart,
  TooltipChartItem,
} from "@/components/chart/TooltipChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GetDailyUserVoteCountAction } from "@/features/dashboard/getDailyUserVoteCount.action";
import { KeyDashboardFactory } from "@/features/dashboard/KeyDashboard.factory";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import { useSession } from "next-auth/react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

export const VotesChart = () => {
  const { status, data: sessionData } = useSession();
  const { data: dailyVotes } = useQuery({
    staleTime: 0,
    queryKey: KeyDashboardFactory.dailyVotesCount(
      sessionData?.user.id as string,
    ),
    queryFn: async () => {
      const result = await GetDailyUserVoteCountAction();

      if (!result || result.serverError || !result.data) {
        toast.error("An error occurred when fetching all votes");
        return [];
      }
      return result.data;
    },
    enabled: status === "authenticated" && !!sessionData.user.id,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Votes Growth</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            data={dailyVotes}
            margin={{ top: 0, right: 20, bottom: 0, left: 20 }}
            title="Votes growth"
          >
            <CartesianGrid
              strokeDasharray="5 5"
              vertical={false}
              stroke="hsl(var(--muted-foreground) / 0.2)"
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="hsl(var(--primary) / 1)"
              fill={`url(#color-primary)`}
              dot={{
                stroke: "hsl(var(--primary) / 0.5)",
                strokeWidth: 1,
                r: 2,
                strokeDasharray: "",
              }}
              activeDot={{
                stroke: "hsl(var(--primary) / 1)",
                strokeWidth: 1,
                r: 4,
                strokeDasharray: "",
              }}
            />
            <Scatter dataKey="amount" fill="hsl(var(--primary))" />
            <XAxis
              dataKey="date"
              stroke="hsl(var(--muted-foreground) / 0.5)"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              interval={3}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground) / 0.5)"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => Intl.NumberFormat().format(value)}
              dataKey={"amount"}
            />
            <Tooltip
              cursor={{ stroke: "hsl(var(--primary) / 0.2)", strokeWidth: 2 }}
              content={({ active, payload }) => {
                if (active && payload && payload.length > 0) {
                  return (
                    <TooltipChart>
                      <TooltipChartItem label="Amount">
                        {payload[0].payload.amount}
                      </TooltipChartItem>

                      <TooltipChartItem label="Date">
                        {formatDate(payload[0].payload.date, "yyyy/MM/dd")}
                      </TooltipChartItem>
                    </TooltipChart>
                  );
                }

                return null;
              }}
            />
            <defs>
              <linearGradient id={`color-primary`} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0.4}
                ></stop>
                <stop
                  offset="75%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0.05}
                ></stop>
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
