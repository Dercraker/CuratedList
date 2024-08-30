import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { User2 } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import { Typography } from "../ui/typography";

export type DisplayCreatorNameProps = ComponentPropsWithoutRef<"div"> & {
  name: string | undefined | null;
  createAt?: Date;
};

export const DisplayCreatorName = ({
  className,
  name,
  createAt,
  ...props
}: DisplayCreatorNameProps) => {
  return (
    <div className={cn("flex items-center", className)} {...props}>
      <User2 />
      <Typography variant="small" className="flex items-center gap-1">
        Created by:{" "}
        <Typography
          variant="small"
          className="hover:cursor-pointer hover:text-primary hover:underline"
        >
          {name ? name : "Unknown User"}
        </Typography>{" "}
        - {format(createAt as Date, "yyyy/MM/dd")}
      </Typography>
    </div>
  );
};
