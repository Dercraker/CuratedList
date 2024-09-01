"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Typography } from "@/components/ui/typography";
import {
  NavigationLinkGroup,
  StaticNavigationLinkSchema,
} from "@/features/navigation/navigation.type";
import { DASHBOARD_LINKS } from "@/features/navigation/NavigationLinks";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { cloneElement, Fragment, useState } from "react";

export const MobileDropdownMenu = ({
  links,
  className,
}: {
  links: NavigationLinkGroup;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className={className}>
          {open ? <X /> : <Menu />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        style={{
          width: "calc(100vw - 2rem)",
          marginRight: "1rem",
        }}
      >
        {links.map((section, index) => (
          <Fragment key={index}>
            {section.title ? (
              <DropdownMenuLabel className="text-muted-foreground">
                {section.title}
              </DropdownMenuLabel>
            ) : null}
            {section.links.map((link: StaticNavigationLinkSchema) => (
              <DropdownMenuItem key={link.href} asChild>
                <Typography
                  as={Link}
                  variant="large"
                  className="flex items-center gap-2 text-base"
                  href={link.href}
                  onClick={() => setOpen(false)}
                >
                  {!!link.icon &&
                    cloneElement(link.icon, {
                      className: "group-hover:text-primary",
                    })}
                  <span>{link.label}</span>
                </Typography>
              </DropdownMenuItem>
            ))}
            {index < DASHBOARD_LINKS.length - 1 ? (
              <DropdownMenuSeparator />
            ) : null}
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
