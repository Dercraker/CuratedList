import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/page/layout";
import type { PageParams } from "@/types/next";
import { InformationCards } from "./_components/InformationCards";
import { VotesChart } from "./_components/VotesChart";

const RoutePage = async (props: PageParams<{}>) => {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Dashboard</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4 lg:gap-8">
        <InformationCards />
        <VotesChart />
      </LayoutContent>
    </Layout>
  );
};

export default RoutePage;
