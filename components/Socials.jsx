import Link from "next/link";

import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const socials = [
  { icon: <FaGithub />, path: "https://github.com/Yadui" },
  { icon: <FaLinkedin />, path: "https://www.linkedin.com/in/abhinavyadav88" },
  { icon: <FaTwitter />, path: "https://x.com/abhinav2302055" },
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
