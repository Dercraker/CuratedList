import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";
import { Typography } from "../ui/typography";

export type TagListProps = ComponentPropsWithoutRef<"div"> & {
  tags: { id: string; title: string }[];
};

export const TagList = ({ className, tags, ...props }: TagListProps) => {
  return (
    <div className={cn("flex", className)} {...props}>
      {tags.map(({ id, title }) => (
        <Typography
          key={id}
          className="mx-1 cursor-pointer select-none text-base first:ml-0 last:mr-0 hover:underline"
        >
          #{title}{" "}
        </Typography>
      ))}
    </div>
  );
};
