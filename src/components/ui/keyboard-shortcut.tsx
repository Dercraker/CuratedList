"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";

const keyboardShortcutVariants = cva(
  "pointer-events-none inline-flex items-center gap-1 overflow-hidden text-nowrap rounded border font-mono shadow-[0_2px_0px_0px_rgba(0,0,0,0.5)]",

  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground",
        primary: "bg-primary text-primary-foreground",
        success:
          "border-green-400 bg-success text-success-foreground dark:border-green-800",
      },
      size: {
        sm: "h-4 px-1 text-xs font-medium",
        default: "h-5 px-1.5 text-xs font-medium",
        lg: "h-6 px-2 text-sm font-medium",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
export type KeyboardShortcutProps = ComponentPropsWithoutRef<"kbd"> &
  VariantProps<typeof keyboardShortcutVariants>;

export const KeyboardShortcut = ({
  children,
  variant,
  size,
  ...props
}: KeyboardShortcutProps) => {
  return (
    <kbd className={cn(keyboardShortcutVariants({ variant, size }))} {...props}>
      {children}
    </kbd>
  );
};

export const CmdOrOption = () => {
  const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";

  if (userAgent.includes("Mac OS X")) {
    return "⌘";
  }

  return "Ctrl";
};
