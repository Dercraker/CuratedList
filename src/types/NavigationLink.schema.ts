import type { ReactNode } from 'react';
import { z } from 'zod';

export const NavigationLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
  auth: z.boolean().default(false),
  icon: z.custom<ReactNode>().optional(),
});
export const NavigationLinksSchema = z.array(NavigationLinkSchema);

export type NavigationLink = z.infer<typeof NavigationLinkSchema>;
export type NavigationLinks = z.infer<typeof NavigationLinksSchema>;
