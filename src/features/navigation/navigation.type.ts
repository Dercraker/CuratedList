import React from "react";
import { z } from "zod";

const StaticNavigationLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
  icon: z.custom<React.ReactElement>().optional(),
  auth: z.boolean().optional(),
});
const DynamicNavigationLinkSchema = z.object({
  label: z.string(),
  href: z.function().args(z.string()).returns(z.string()),
  icon: z.custom<React.ReactElement>().optional(),
  auth: z.boolean().optional(),
});

const NavigationLinkSchema = z.union([
  StaticNavigationLinkSchema,
  DynamicNavigationLinkSchema,
]);

const NavigationLinksSchema = z.record(NavigationLinkSchema);

const NavigationLinkGroup = z.array(
  z.object({
    title: z.string().optional(),
    links: z.array(StaticNavigationLinkSchema),
  }),
);

const GenericLinkSchema = z.record(
  z.union([NavigationLinkSchema, NavigationLinksSchema]),
);

export type StaticNavigationLinkSchema = z.infer<
  typeof StaticNavigationLinkSchema
>;
export type GenericLinkSchema = z.infer<typeof GenericLinkSchema>;
export type NavigationLinkGroup = z.infer<typeof NavigationLinkGroup>;
