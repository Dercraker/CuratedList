import { SiteName } from "@/components/header/siteName";
import { User } from "lucide-react";
import { SearchBar } from "../searchbar/searchbar";
import { SiteNameShort } from "./siteNameShort";

export const Navbar = () => {
  return (
    <>
      <nav className="flex  border-stone-500/20 border-b  w-full justify-center xl:px-56 px-4">
        <div className=" w-full max-w-[3000px] flex  items-center  justify-between ">
          <SiteName className="py-6 self-start hidden lg:flex" />
          <SiteNameShort className="py-6 self-start hidden md:flex lg:hidden " />
          <div className="  flex flex-row xl:w-1/2 w-full py-4  md:ml-2">
            <SearchBar />
          </div>
          <div className=" justify-end flex  ml-2">
            <User size={40} color="#000000" strokeWidth={1.25} />
          </div>
        </div>
      </nav>
    </>
  );
};
