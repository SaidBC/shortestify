"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

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
  { country: "usa", visitors: 275, fill: "blue" },
  { country: "india", visitors: 200, fill: "yellow" },
  { country: "morocco", visitors: 187, fill: "red" },
  { country: "france", visitors: 173, fill: "purple" },
  { country: "other", visitors: 90, fill: "skyblue" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  usa: {
    label: "usa",
    color: "hsl(var(--chart-1))",
  },
  india: {
    label: "india",
    color: "hsl(var(--chart-2))",
  },
  morocco: {
    label: "morocco",
    color: "hsl(var(--chart-3))",
  },
  france: {
    label: "france",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function MostClickedCountry() {
  return (
    <Card className="flex flex-col bg-slate-900 border-slate-950">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-white">Most Clicked Country</CardTitle>
        <CardDescription>January - June 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-84 [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="visitors" hideLabel />}
            />
            <Pie data={chartData} dataKey="visitors">
              <LabelList
                dataKey="country"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none text-white">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
