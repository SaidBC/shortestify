"use client";

import { TrendingUp } from "lucide-react";
import useSWR from "swr";
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from "recharts";

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
import lastMonthData from "@/utils/lastPeriodData";
import clientEnv from "@/utils/clientEnv";
import {
  ITransactionsChartResponse,
  ITransactionsChartResultData,
} from "@/types";
import { useEffect, useState } from "react";
import { Transaction } from "@prisma/client";
import axios, { Axios } from "axios";

const chartConfig = {
  downloads: {
    label: "downloads",
    color: "hsl(var(--chart-1))",
  },
  redirects: {
    label: "redirects",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function RedirectsDownloadsChart({}) {
  const fetcher = async (arg: string) => {
    const axiosFetcher = axios.create({
      baseURL: clientEnv.NEXT_PUBLIC_API_URL,
      timeout: 10000,
    });
    try {
      const response = await axiosFetcher.get(arg);
      return response.data;
    } catch (err) {
      throw err;
    }
  };
  const { data, isLoading, error } = useSWR<ITransactionsChartResponse>(
    "/me/charts?type=REDIRECT,UPLOAD",
    fetcher
  );
  if (isLoading) return <>Loading ...</>;
  if (!data || error) return <>Error: Something went wrong</>;
  const chart = data;
  if (!chart.success) {
    return <div>Error: Something went wrong</div>;
  }
  return (
    <Card className="flex flex-col bg-slate-900 border-slate-950">
      <CardHeader>
        <CardTitle>Bar Chart - Multiple</CardTitle>
        <CardDescription>Last mounth</CardDescription>
      </CardHeader>
      <CardContent className="fill-blue-500">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chart.data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="downloads" fill="white" radius={4} />
            <Bar dataKey="redirects" fill="var(--color-blue-500)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total redirects for the last month
        </div>
      </CardFooter>
    </Card>
  );
}
