import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";
import { ListCardItemLoader } from "./ListCardItem.loader";

export type ListContainerProps = ComponentPropsWithoutRef<"div"> & {
  count: number;
};

export const ListContainerLoader = ({
  count,
  className,
  ...props
}: ListContainerProps) => {
  return (
    <div
      className={cn("flex justify-center flex-wrap h-fit", className)}
      {...props}
    >
      {Array.from({ length: count }).map((_, idx) => (
        <ListCardItemLoader key={idx} />
      ))}
    </div>
  );
};
