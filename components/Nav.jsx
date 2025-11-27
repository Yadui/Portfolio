"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "resume",
    path: "/resume",
  },
  {
    name: "work",
    path: "/work",
  },
];
const Nav = () => {
  const pathname = usePathname();

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <nav className="flex gap-8">
      {links.map((link, index) => (
        <Link
          href={link.path}
          key={index}
          prefetch={true}
          onClick={handleClick}
          className={`${
            link.path === pathname ? "text-accent border-b-2 border-accent" : ""
          } capitalize font-medium hover:text-accent transition-all `}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
