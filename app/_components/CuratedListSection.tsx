import { SectionLayout } from "@/components/landing/SectionLayout";
import { ListContainer } from "@/components/list/ListContainer";
import { Loader } from "@/components/ui/loader";
import { Suspense } from "react";

export type CuratedListSectionProps = {};

export const CuratedListSection = async (props: CuratedListSectionProps) => {
  return (
    <SectionLayout size="full">
      <Suspense fallback={<Loader />}>
        <ListContainer />
      </Suspense>
    </SectionLayout>
  );
};
