import {
  AlertCircle,
  ArrowUpDown,
  Bookmark,
  Coins,
  Mail,
  Scroll,
  ScrollText,
  User2,
} from "lucide-react";
import { GenericLinkSchema, NavigationLinkGroup } from "./navigation.type";

export const LINKS = {
  Landing: {
    label: "Home",
    href: "/",
  },
  List: {
    label: "Lists",
    href: (listId: string) => `/lists/${listId}`,
  },
  Dashboard: {
    Dashboard: {
      label: "Dashboard",
      href: "/dashboard",
    },
    Lists: {
      label: "Lists",
      href: "/dashboard/lists",
      icon: <Scroll />,
    },
    Items: {
      label: "Items",
      href: "/dashboard/items",
      icon: <ScrollText />,
    },
    Votes: {
      label: "My votes",
      href: "/dashboard/votes",
      icon: <ArrowUpDown />,
    },
    Bookmarks: {
      label: "My Bookmarks",
      href: "/dashboard/bookmarks",
      icon: <Bookmark />,
    },
  },
  Account: {
    Profile: {
      label: "Profile",
      href: "/account",
      icon: <User2 />,
    },
    Delete: {
      label: "Delete profile",
      href: "/account/delete",
      icon: <AlertCircle />,
    },
    Billing: {
      label: "Billing",
      href: "account/billing",
      icon: <Coins />,
    },
    Email: {
      label: "Email Settings",
      href: "/account/email",
      icon: <Mail />,
    },
  },
} satisfies GenericLinkSchema;

export const DASHBOARD_LINKS = [
  {
    links: [LINKS.Dashboard.Dashboard],
  },
  {
    title: "Content",
    links: [
      LINKS.Dashboard.Lists,
      LINKS.Dashboard.Items,
      LINKS.Dashboard.Votes,
      LINKS.Dashboard.Bookmarks,
    ],
  },
] satisfies NavigationLinkGroup;

export const ACCOUNT_LINKS = [
  {
    title: "PERSONAL INFORMATION",
    links: [LINKS.Account.Profile, LINKS.Account.Delete, LINKS.Account.Billing],
  },
  {
    title: "EMAIL SETTINGS",
    links: [LINKS.Account.Email],
  },
] satisfies NavigationLinkGroup;
