import { cn } from "@/lib/utils";
import { LINKS } from "@/utils/NavigationLinks";
import Link from "next/link";

import { Roboto_Condensed } from "next/font/google";

const robotoTitle = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "100", "300", "500", "700", "900"],
});

type SiteNameProps = {
  className?: string;
};

export const SiteNameShort = ({ className }: SiteNameProps) => {
  return (
    <div
      className={cn(
        `font-bold text-4xl  py-4 mr-4 ${robotoTitle.className}`,
        className
      )}
    >
      <Link href={LINKS.Landing.href} className="select-none">
        {"<CD/>"}
      </Link>
    </div>
  );
};
