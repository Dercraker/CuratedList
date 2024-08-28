import { AuthButton } from "@/components/auth/AuthButton";
import { Layout } from "@/components/page/layout";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/features/theme/ThemeToggle";
import { SiteConfig } from "@/site-config";
import Image from "next/image";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import { DesktopVerticalMenu } from "../../src/components/navigation/DesktopVerticalMenu";
import { MobileDropdownMenu } from "../../src/components/navigation/MobileDropdownMenu";
import { ACCOUNT_LINKS } from "./account-links";

export const AccountNavigation = async (props: PropsWithChildren) => {
  return (
    <div className="flex min-h-full flex-col">
      <header className="w-full border-b bg-background max-lg:sticky max-lg:top-0 max-lg:z-40">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex items-center gap-2">
            <Image
              src={SiteConfig.appIcon}
              alt="app logo"
              width={32}
              height={32}
            />
            <Link href="/" className="text-lg font-bold ">
              {SiteConfig.title}
            </Link>
          </div>

          <nav className="flex flex-1 items-center justify-end space-x-1">
            <AuthButton />
            <ThemeToggle />
            <MobileDropdownMenu className="lg:hidden" links={ACCOUNT_LINKS} />
          </nav>
        </div>
      </header>
      {/* Desktop ONLY Navigation bar */}
      <Layout className="flex flex-row items-start gap-4">
        <DesktopVerticalMenu links={ACCOUNT_LINKS} className="max-lg:hidden" />
        <Separator className="max-lg:hidden" orientation="vertical" />
        <main className="flex-1">{props.children}</main>
      </Layout>
    </div>
  );
};
