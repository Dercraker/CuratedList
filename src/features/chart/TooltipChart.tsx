import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

export const TooltipChart = (props: PropsWithChildren) => {
  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid grid-cols-2 gap-2">{props.children}</div>
    </div>
  );
};

export const TooltipChartItem = ({
  label,
  className,
  children,
}: PropsWithChildren<{
  label: string;
  className?: string;
}>) => {
  return (
    <div className="flex flex-col">
      <span className="text-[0.70rem] uppercase text-muted-foreground">
        {label}
      </span>
      <span className={cn("font-bold", className)}>{children}</span>
    </div>
  );
};
