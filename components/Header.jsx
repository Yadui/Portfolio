import Link from "next/link";
import Nav from "./Nav";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header className="py-2 text-white bg-pink-50/20">
      <div className="container mx-auto flex justify-center">
        <div className="hidden xl:flex items-center gap-8">
          <Nav className="" />
        </div>

        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
