import { z } from 'zod';
import { NavigationLinkSchema } from './NavigationLink.schema';

export const NavigationLinkWithGroupSchema = z.object({
  title: z.string(),
  links: z.array(NavigationLinkSchema),
});
export const NavigationLinksWithGroupSchema = z.array(
  NavigationLinkWithGroupSchema
);

export type NavigationLinkWithGroup = z.infer<
  typeof NavigationLinkWithGroupSchema
>;
export type NavigationLinksWithGroup = z.infer<
  typeof NavigationLinksWithGroupSchema
>;
