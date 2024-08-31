import ogs from "open-graph-scraper";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export type DisplayOGProps = {
  url: string;
};

export const DisplayOG = async ({ url }: DisplayOGProps) => {
  const { error, result } = await ogs({ url });

  if (!error && !!result.ogImage?.length)
    return (
      <img
        className="aspect-video max-h-40 select-none rounded-lg lg:max-h-48"
        src={result.ogImage[0].url}
      />
    );

  return (
    <Alert variant="destructive">
      <AlertTitle>OG Not Found</AlertTitle>
      <AlertDescription>
        Current OpenGraph could not be fetched
      </AlertDescription>
    </Alert>
  );
};
