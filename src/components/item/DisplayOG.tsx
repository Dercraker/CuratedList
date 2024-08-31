import ogs from "open-graph-scraper";

export type DisplayOGProps = {
  url: string;
};

export const DisplayOG = async ({ url }: DisplayOGProps) => {
  const { error, result } = await ogs({ url });

  console.log("🚀 ~ DisplayOG ~ result:", result);

  if (!error && !!result.ogImage?.length)
    return (
      <img
        className="aspect-video max-h-40 rounded-lg lg:max-h-48"
        src={result.ogImage[0].url}
      />
    );
};
