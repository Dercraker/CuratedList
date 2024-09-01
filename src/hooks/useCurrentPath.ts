import { NavigationLinkGroup } from "@/features/navigation/navigation.type";
import { usePathname } from "next/navigation";

export const useCurrentPath = (links: NavigationLinkGroup) => {
  const currentPath = usePathname();
  const pathSegments = currentPath.split("/");
  const allDashboardLinks = links.flatMap((section) => section.links);

  const linkMatchCounts = allDashboardLinks.map((link) => ({
    url: link.href,
    matchCount: link.href
      .split("/")
      .filter((segment, index) => segment === pathSegments[index]).length,
  }));

  const mostMatchingLink = linkMatchCounts.reduce(
    (maxMatchLink, currentLink) =>
      currentLink.matchCount > maxMatchLink.matchCount
        ? currentLink
        : maxMatchLink,
    { url: "", matchCount: 0 },
  );

  return mostMatchingLink.url;
};
