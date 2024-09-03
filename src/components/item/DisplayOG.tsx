import ogs from "open-graph-scraper";

import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export type DisplayOGProps = {
  url: string;
};

export const DisplayOG = async ({ url }: DisplayOGProps) => {
  try {
    const { result } = await ogs({ url });

    if (!result.ogImage?.length)
      return (
        <Alert variant="destructive">
          <AlertTitle>OG Not Found</AlertTitle>
          <AlertDescription>
            Current OpenGraph could not be fetched
          </AlertDescription>
        </Alert>
      );

    return (
      <img
        className="aspect-video max-h-40 select-none rounded-lg lg:max-h-48"
        src={result.ogImage[0].url}
      />
    );
  } catch (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>OG Not Found</AlertTitle>
        <AlertDescription>
          Current OpenGraph could not be fetched
        </AlertDescription>
      </Alert>
    );
  }
};
