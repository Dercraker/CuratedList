import rehypeAutolinkHeading from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import type { PluggableList } from "unified";

export const rehypePlugins = [
  [
    rehypePrism,
    {
      ignoreMissing: true,
    },
  ],
  rehypeSlug,
  rehypeAutolinkHeading,
] satisfies PluggableList;

export const remarkPlugins = [remarkGfm] satisfies PluggableList;
