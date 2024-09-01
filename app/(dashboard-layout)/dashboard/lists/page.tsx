import { PaginationContainer } from "@/components/navigation/paginationContainer";
import { LINKS } from "@/features/navigation/NavigationLinks";
import type { PageParams } from "@/types/next";
import { AdminListContainer } from "./_components/AdminListContainer";

const RoutePage = async (props: PageParams<{}>) => {
  return (
    <>
      <AdminListContainer />
      <PaginationContainer baseUrl={LINKS.Dashboard.Lists.href} total={18} />
    </>
  );
};

export default RoutePage;
