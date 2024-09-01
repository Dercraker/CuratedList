import { SectionLayout } from "@/components/landing/SectionLayout";
import { ListDetailContainer } from "@/components/listDetail/listDetailContainer";
import { GetListQuery } from "@/features/list/getList.query";
import type { PageParams } from "@/types/next";

const RoutePage = async ({
  params: { listId },
}: PageParams<{ listId: string }>) => {
  const list = await GetListQuery({ listId });

  return (
    <SectionLayout size="xl">
      <ListDetailContainer list={list} />
    </SectionLayout>
  );
};

export default RoutePage;
