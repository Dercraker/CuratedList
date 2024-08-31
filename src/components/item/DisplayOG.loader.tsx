import { Skeleton } from "../ui/skeleton";

export type DisplayOGLoaderProps = {};

export const DisplayOGLoader = (props: DisplayOGLoaderProps) => {
  return (
    <Skeleton className="aspect-video max-h-40 w-full rounded-lg lg:max-h-48" />
  );
};
