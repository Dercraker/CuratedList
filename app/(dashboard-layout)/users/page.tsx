import { Button } from "@/components/ui/button";
import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import type { PageParams } from "@/types/next";
import { DonutChart } from "./donuts-chart";
import { UsersChart } from "./users-chart";

export default async function RoutePage(props: PageParams<{}>) {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Demo Shart</LayoutTitle>
      </LayoutHeader>
      <LayoutActions className="flex gap-2">
        <Button variant="outline">Delete</Button>
        <Button variant="invert">Create</Button>
      </LayoutActions>
      <LayoutContent className="flex  gap-6">
        <UsersChart />
        <DonutChart />
      </LayoutContent>
    </Layout>
  );
}
