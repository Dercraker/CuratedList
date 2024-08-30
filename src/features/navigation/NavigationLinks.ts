import {
  NavigationLinkType,
  NavigationLinkWithGroupType,
} from "./navigation.type";

export const LINKS = {
  Landing: {
    label: "Home",
    href: "/",
  },
  List: {
    label: "Lists",
    href: (listId: string) => `/lists/${listId}`,
  },
} satisfies
  | { [key: string]: NavigationLinkType }
  | { [key: string]: NavigationLinkWithGroupType };
