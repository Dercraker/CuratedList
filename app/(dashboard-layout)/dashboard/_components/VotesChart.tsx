"use client";

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
