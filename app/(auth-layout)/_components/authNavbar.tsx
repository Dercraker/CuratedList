import { SiteName } from '@/src/components/header/siteName';

export const AuthNavbar = () => {
  return (
    <>
      <nav className="flex flex-row items-center border-b border-stone-500/20 ">
        <SiteName className="py-6" />
      </nav>
    </>
  );
};
