import Link from "next/link";

import { FaGithub, FaLinkedin, FaKaggle } from "react-icons/fa";
import { TbBrandLeetcode } from "react-icons/tb";

const socials = [
  { icon: <FaGithub />, path: "https://github.com/Yadui" },
  { icon: <FaLinkedin />, path: "www.linkedin.com/in/abhinav-yadav-a49408232" },
  { icon: <FaKaggle />, path: "https://www.kaggle.com/abhinavyadav8" },
  { icon: <TbBrandLeetcode />, path: "https://leetcode.com/u/abhinavyadav8/" },
];

const Socials = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles}>
      {socials.map((items, index) => {
        return (
          <Link key={index} href={items.path} className={iconStyles}>
            {items.icon}
          </Link>
        );
      })}
    </div>
  );
};

export default Socials;
