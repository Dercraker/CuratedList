import { PaginationComponent } from "@/components/navigation/paginationContainer";
import { LINKS } from "@/features/navigation/NavigationLinks";
import type { PageParams } from "@/types/next";
import { AdminListContainer } from "./_components/AdminListContainer";

const RoutePage = async (props: PageParams<{}>) => {
  return (
    <div>
      <AdminListContainer />
      <PaginationComponent
        baseUri={LINKS.Dashboard.Lists.href}
        itemCount={90}
      />
    </div>
  );
};

export default RoutePage;
