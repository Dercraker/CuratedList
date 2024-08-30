import { SectionLayout } from "@/components/landing/SectionLayout";
import { ListContainer } from "@/components/list/ListContainer";

export type CuratedListSectionProps = {};

export const CuratedListSection = async (props: CuratedListSectionProps) => {
  return (
    <SectionLayout size="full">
      <ListContainer />
    </SectionLayout>
  );
};
