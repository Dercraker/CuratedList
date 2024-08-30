import { GetListQuery } from "@/features/list/getList.query";
import { auth } from "@/lib/auth/helper";
import { BookmarkButton } from "../list/ListBookmarkButton";
import { Typography } from "../ui/typography";
import { DisplayCreatorName } from "./displayCreatorName";
import { TagList } from "./tagList";

export type ListDetailContainerProps = {
  list: GetListQuery;
  isBookmark: boolean;
};

export const ListDetailContainer = async ({
  isBookmark,
  list: { items, tags, createdAt, description, id, title, creator, creatorId },
}: ListDetailContainerProps) => {
  const user = await auth();

  return (
    <div className="mx-auto flex max-w-screen-lg items-baseline justify-center bg-red-400/10">
      <div className="flex flex-col items-baseline gap-2">
        <Typography variant="h1">{title}</Typography>
        <TagList tags={tags} />
        <DisplayCreatorName name={creator?.name} createAt={createdAt} />
      </div>
      <div className="ml-auto">{user && <BookmarkButton listId={id!} />}</div>
    </div>
  );
};
