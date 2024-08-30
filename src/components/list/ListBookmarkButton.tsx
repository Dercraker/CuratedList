"use client";

import { IsListBookmarkAction } from "@/features/lists/isListBookmark.action";
import { KeyListFactory } from "@/features/lists/keyList.factory";
import { ToggleListBookmarkAction } from "@/features/lists/toggleListBookmark.action";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
};

export const BookmarkButton = ({ listId }: BookmarkButtonProps) => {
  const [isHover, setIsHover] = useState(false);

  const queryClient = useQueryClient();
  const { data: isBookmark } = useQuery({
    queryKey: KeyListFactory.isBookmark(listId),
    queryFn: async () => {
      const result = await IsListBookmarkAction({ listId });

      return result?.data || false;
    },
    staleTime: 0,
  });

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
