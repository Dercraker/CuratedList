"use client";

import { KeyListFactory } from "@/features/curated/List/keyList.factory";
import { ToggleListBookmarkAction } from "@/features/curated/List/toggleListBookmark.action";
import { useQueryClient } from "@tanstack/react-query";
import {
  Bookmark,
  BookmarkCheck,
  BookmarkMinus,
  BookmarkPlus,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export type BookmarkButtonProps = {
  listId: string;
  isBookmark: boolean;
};

export const BookmarkButton = ({ isBookmark, listId }: BookmarkButtonProps) => {
  const [isHover, setIsHover] = useState(false);

  const queryClient = useQueryClient();

  const handleBookmark = async () => {
    const result = await ToggleListBookmarkAction({ listId });

    if (!result || result.serverError)
      return toast.error("An error occurred. Please try again later");

    if (isBookmark)
      toast.success("This list as been removed from yours bookmarks");
    else toast.success("This list as been added from yours bookmarks");

    queryClient.invalidateQueries({
      queryKey: KeyListFactory.isBookmark(listId),
    });
  };

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="hover:cursor-pointer"
    >
      {!isHover && !isBookmark && (
        <Bookmark className="" onClick={() => handleBookmark()} />
      )}
      {isHover && !isBookmark && (
        <BookmarkPlus
          className="text-primary"
          onClick={() => handleBookmark()}
        />
      )}

      {!isHover && isBookmark && (
        <BookmarkCheck
          className="text-primary"
          onClick={() => handleBookmark()}
        />
      )}
      {isHover && isBookmark && (
        <BookmarkMinus
          className="text-red-500"
          onClick={() => handleBookmark()}
        />
      )}
    </div>
  );
};
