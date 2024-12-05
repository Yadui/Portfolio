import Link from "next/link";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import Nav from "./Nav";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header className="py-8 xl:py-12 text-white bg-pink-50/20">
      <div className="container mx-auto flex justify-between">
        {/* {logo} */}
        <Link href={"/"}>
          <h1 className="text-4xl font-semibold">
            Abhinav<span className="text-accent">.</span>
          </h1>
        </Link>
        {/* {desktop nav} */}
        <div className="hidden xl:flex items-center gap-8">
          <Nav className="" />
          <Link href={"/contact"}>
            <Button>Hire me</Button>
          </Link>
        </div>

        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
