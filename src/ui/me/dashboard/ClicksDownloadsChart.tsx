"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", upload: 0, click: 0 },
  { month: "February", upload: 0, click: 0 },
  { month: "March", upload: 0, click: 0 },
  { month: "April", upload: 0, click: 0 },
  { month: "May", upload: 0, click: 0 },
  { month: "June", upload: 0, click: 0 },
];

const chartConfig = {
  upload: {
    label: "upload",
    color: "hsl(var(--chart-1))",
  },
  click: {
    label: "click",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function ClicksDownloadsChart() {
  return (
    <Card className="bg-slate-900 border-slate-950">
      <CardHeader>
        <CardTitle className="text-white">
          Analytics for Downloads and Clicks
        </CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="upload"
              type="monotone"
              stroke="gray"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="click"
              type="monotone"
              stroke="white"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none text-white">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing total click and downloads for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
