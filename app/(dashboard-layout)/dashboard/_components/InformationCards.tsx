import { ArrowUpDown, Bookmark, Scroll, ScrollText } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Counter } from "@/components/ui/counter";
import { GetAllUserBookmarkCountCountQuery } from "@/features/dashboard/getAllUserBookmarkCount.query";
import { GetAllUserItemCountQuery } from "@/features/dashboard/getAllUserItemCount.query";
import { GetAllUserListCountQuery } from "@/features/dashboard/getAllUserListCount.query";
import { GetAllUserVoteCountQuery } from "@/features/dashboard/getAllUserVoteCount.query";
import { requiredAuth } from "@/lib/auth/helper";

export const InformationCards = async () => {
  const user = await requiredAuth();

  const { previousMonthTotalListCount, totalListCount } =
    await GetAllUserListCountQuery({
      userId: user.id,
    });
  const listRatio = previousMonthTotalListCount
    ? ((totalListCount - previousMonthTotalListCount) /
        previousMonthTotalListCount) *
      100
    : 0;

  const { previousMonthTotalItemCount, totalItemCount } =
    await GetAllUserItemCountQuery({
      userId: user.id,
    });
  const itemRatio = previousMonthTotalItemCount
    ? ((totalItemCount - previousMonthTotalItemCount) /
        previousMonthTotalItemCount) *
      100
    : 0;

  const { previousMonthTotalVoteCount, totalVoteCount } =
    await GetAllUserVoteCountQuery({
      userId: user.id,
    });
  const voteRatio = previousMonthTotalVoteCount
    ? ((totalVoteCount - previousMonthTotalVoteCount) /
        previousMonthTotalVoteCount) *
      100
    : 0;

  const { previousMonthTotalBookmarkCount, totalBookmarkCount } =
    await GetAllUserBookmarkCountCountQuery({
      userId: user.id,
    });
  const bookmarkRatio = previousMonthTotalBookmarkCount
    ? ((totalBookmarkCount - previousMonthTotalBookmarkCount) /
        previousMonthTotalBookmarkCount) *
      100
    : 0;

  return (
    <div className="flex w-full items-center gap-4 max-lg:flex-col lg:gap-8">
      <Card className="w-full flex-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Lists</CardTitle>
          <Scroll className="size-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <Counter to={totalListCount} digits={0} />
          </div>
          <p className="text-xs text-muted-foreground">
            {listRatio < 0 ? "-" : "+"}
            <Counter to={listRatio} digits={0} />% from last month
          </p>
        </CardContent>
      </Card>
      <Card className="w-full flex-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Items</CardTitle>
          <ScrollText className="size-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <Counter to={totalItemCount} digits={0} />
          </div>
          <p className="text-xs text-muted-foreground">
            {itemRatio < 0 ? "-" : "+"}
            <Counter to={itemRatio} digits={0} />% from last month
          </p>
        </CardContent>
      </Card>
      <Card className="w-full flex-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Votes</CardTitle>
          <ArrowUpDown className="size-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <Counter to={totalVoteCount} digits={0} />
          </div>
          <p className="text-xs text-muted-foreground">
            {voteRatio < 0 ? "-" : "+"}
            <Counter to={voteRatio} digits={0} />% from last month
          </p>
        </CardContent>
      </Card>
      <Card className="w-full flex-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Bookmark</CardTitle>
          <Bookmark className="size-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <Counter to={totalBookmarkCount} digits={0} />
          </div>
          <p className="text-xs text-muted-foreground">
            {bookmarkRatio < 0 ? "-" : "+"}
            <Counter to={bookmarkRatio} digits={0} />% from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
