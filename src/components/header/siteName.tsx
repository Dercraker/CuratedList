import { cn } from '@/src/lib/utils';
import { LINKS } from '@/src/utils/NavigationLinks';
import Link from 'next/link';

type SiteNameProps = {
  className?: string;
};

export const SiteName = ({ className }: SiteNameProps) => {
  return (
    <div className={cn('font-bold text-4xl pl-56 mr-4 py-4', className)}>
      <Link href={LINKS.Landing.href} className="select-none">
        CuratedDev
      </Link>
    </div>
  );
};
