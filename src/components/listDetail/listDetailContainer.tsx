import { ItemSchema } from "@/features/item/itemSchema";
import { GetListQuery } from "@/features/list/getList.query";
import { auth } from "@/lib/auth/helper";
import { ItemCard } from "../item/itemCard";
import { BookmarkButton } from "../list/ListBookmarkButton";
import { Typography } from "../ui/typography";
import { DisplayCreatorName } from "./displayCreatorName";
import { TagList } from "./tagList";

export type ListDetailContainerProps = {
  list: GetListQuery;
};

export const ListDetailContainer = async ({
  list: { items, tags, createdAt, description, id, title, creator },
}: ListDetailContainerProps) => {
  const user = await auth();

  return (
    <div className="mx-auto">
      <div className="flex items-baseline justify-center px-16">
        <div className="flex flex-col items-baseline gap-2">
          <Typography variant="h1">{title}</Typography>
          <TagList className="-mt-2 text-muted-foreground" tags={tags} />
          <DisplayCreatorName name={creator?.name} createAt={createdAt} />
        </div>
        <div className="ml-auto">{user && <BookmarkButton listId={id!} />}</div>
      </div>
      <div className="mx-auto my-6">
        <Typography variant="lead" className="line-clamp-5 px-16">
          {description}
        </Typography>
      </div>
      <div className="flex flex-wrap items-center justify-evenly">
        {items.map((item) => (
          <ItemCard key={item.id} item={ItemSchema.parse(item)} />
        ))}
      </div>
    </div>
  );
};
