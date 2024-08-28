"use client";

import { useMatchingPathname } from "@/hooks/useMatchingPathname";
import { motion } from "framer-motion";
import Link from "next/link";

type SettingLink = {
  href: string;
  label: string;
};

export const SettingsNavigation = ({ links }: { links: SettingLink[] }) => {
  const matchingLink = useMatchingPathname(links.map((l) => l.href));

  return (
    <div className="flex gap-2 lg:flex-col" style={{ minWidth: 150 }}>
      {links.map((link) => {
        const isMatching = link.href === matchingLink;
        return (
          <div key={link.href} className="relative w-full">
            {isMatching && (
              <motion.div
                className="absolute inset-0 rounded-md bg-accent/50"
                layoutId="settings-link-list"
              />
            )}
            <Link
              className="relative inline-block w-full rounded-md border border-transparent p-2.5 text-sm text-foreground transition-all duration-75 hover:border-accent/50"
              href={link.href}
            >
              {link.label}
            </Link>
          </div>
        );
      })}
    </div>
  );
};
