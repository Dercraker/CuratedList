import { User2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Typography } from "../ui/typography";
import { WobbleCard } from "../ui/wobble-card";

export type ListCardItemProps = {};

export const ListCardItemLoader = (props: ListCardItemProps) => {
  return (
    <WobbleCard>
      <Card className="m-4 flex h-60 w-3xl select-none flex-col">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-8" />
          </CardTitle>
          <CardDescription className="flex items-baseline justify-between ">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, idx) => (
                <div
                  className="mx-1 flex items-center first:ml-0 last:mr-0"
                  key={idx}
                >
                  #
                  <Skeleton className="h-4 w-12" key={idx} />
                </div>
              ))}
            </div>

            <Typography
              variant="muted"
              className="cursor-pointer hover:underline"
            >
              <div className="flex items-center">
                <Skeleton className="mr-1 h-4 w-5" /> item
              </div>
            </Typography>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5" />
            <Skeleton className="h-5 w-4/6" />
          </div>
        </CardContent>
        <CardFooter className="mt-auto">
          <div className="flex items-center">
            <User2 />
            <div className="flex items-center gap-1">
              Created by: <Skeleton className="h-4 w-32" /> -{" "}
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </CardFooter>
      </Card>
    </WobbleCard>
  );
};
