"use client";

import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/ui/typography";
import {
  NavigationLinkGroup,
  StaticNavigationLinkSchema,
} from "@/features/navigation/navigation.type";
import { useCurrentPath } from "@/hooks/useCurrentPath";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { cloneElement, Fragment } from "react";
export const DesktopVerticalMenu = ({
  links,
  className,
}: {
  links: NavigationLinkGroup;
  className?: string;
}) => {
  const currentPath = useCurrentPath(links);

  return (
    <nav className={cn("flex flex-col gap-4", className)}>
      {links.map((section, index) => (
        <Fragment key={index}>
          {section.title ? (
            <Typography variant="muted" className="px-2">
              {section.title}
            </Typography>
          ) : null}
          <div className="flex flex-col gap-2">
            {section.links.map((link: StaticNavigationLinkSchema) => {
              const isCurrent = currentPath === link.href;

              return (
                <Link
                  key={link.href}
                  className={cn(
                    "group flex h-8 items-center gap-2 rounded-md px-2 text-sm transition-colors",
                    "hover:bg-card",
                    {
                      "bg-accent/50 hover:bg-accent/80": isCurrent,
                    },
                  )}
                  href={link.href}
                >
                  {!!link.icon &&
                    cloneElement(link.icon, {
                      className: cn("group-hover:text-primary", {
                        "text-primary": isCurrent,
                      }),
                    })}
                  <span className="flex h-8 items-center gap-2 rounded-md px-2 text-sm">
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>
          {index < links.length - 1 ? <Separator /> : null}
        </Fragment>
      ))}
    </nav>
  );
};
