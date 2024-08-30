import type { ReactElement } from "react";
import React from "react";
import { z } from "zod";

type DashboardLinkItem = {
  title: string;
  icon: ReactElement;
  url: string;
};

export type NavigationLinkGroups = {
  title?: string;
  links: DashboardLinkItem[];
};

export const NavigationLinkSchema = z.object({
  label: z.string(),
  href: z.union([
    z.string(),
    z.function().args(z.string()).returns(z.string()),
  ]),
  icon: z.custom<React.ReactNode>().optional(),
  auth: z.boolean().optional(),
});

export type NavigationLinkType = z.infer<typeof NavigationLinkSchema>;

export const NavigationLinkWithGroupSchema = z.object({
  title: z.string(),
  links: z.array(NavigationLinkSchema),
});

export type NavigationLinkWithGroupType = z.infer<
  typeof NavigationLinkWithGroupSchema
>;
