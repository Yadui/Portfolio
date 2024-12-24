"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectLabel,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FaPhoneAlt, FaEnvelope, FaMapMarkedAlt } from "react-icons/fa";
import { Description } from "@radix-ui/react-dialog";

const info = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    description: "+91 9971208044",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "abhinavyadav8@gmail.com",
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "Address",
    description: "Gurugram, Haryana",
  },
];
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="py-10"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          {/* form */}
          <div className="xl:w-[54%] order-2 xl:order-none">
            <form
              className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl"
              action=""
            >
              <h3 className="text-4xl text-accent">Lets Work together</h3>
              <p className="text-white/60">
                Collaborate with me to bring your ideas to life with creativity
                and precision.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="firstname"
                  placeholder="Firstname"
                  className="rounded-xl"
                />
                <Input
                  type="lastname"
                  placeholder="Lastname"
                  className="rounded-xl"
                />
                <Input
                  type="email"
                  placeholder="Email address"
                  className="rounded-xl"
                />
                <Input
                  type="phone"
                  placeholder="Phone number"
                  className="rounded-xl"
                />
              </div>
              <Select>
                <SelectTrigger className="w-full rounded-xl">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent className="bg-primary rounded-xl">
                  <SelectGroup>
                    <SelectLabel>Select a service</SelectLabel>
                    <SelectItem value="est">Web dev</SelectItem>
                    <SelectItem value="cst">Ui/Ux design</SelectItem>
                    <SelectItem value="mst">Logo design</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* textarea */}
              <Textarea
                className="h-[200px] resize-none rounded-xl"
                placeholder="Type your message here."
              />
              {/* btn */}
              <Button size="md" className="max-w-40">
                Send message
              </Button>
            </form>
          </div>
          <div className="flex-1 flex items-center xl:justify-end xl:order-1 mb-8 xl:mb-0 xl:text-left">
            <ul className="flex flex-col gap-10 sm:flex">
              <Image
                src="/assets-1/Abhinav_Yadav.png"
                width={200}
                height={200}
                alt="contact qr"
                className="w-80 h-80 rounded-xl hover:scale-110 transition-all ease-in-out xl:justify-center"
              />
              {info.map((item, index) => {
                return (
                  <li key={index} className="flex items-center gap-6">
                    <div className="w-[52px] h-[52px] xl:h-[72px] xl:w-[72px] bg-[#27272c] text-accent rounded-full flex items-center justify-center ">
                      <div>{item.icon}</div>
                    </div>
                    <div>
                      <p>{item.title}</p>
                      <h3>{item.description}</h3>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
