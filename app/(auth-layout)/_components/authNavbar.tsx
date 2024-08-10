import { SiteName } from "@/components/header/siteName";

export const AuthNavbar = () => {
  return (
    <>
      <nav className="flex flex-row items-center border-stone-500/20 border-b w-full px-56">
        <SiteName className="py-6" />
      </nav>
    </>
  );
};
