import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";

//components
import Photo from "@/components/Photo";
import Socials from "@/components/Socials";
import Stats from "@/components/Stats";

const Home = () => {
  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        {/* Main container */}
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24 ">
          {/* Text and Socials in one column */}
          <div className=" text-center xl:text-left gap-8 order-2 xl:order-none">
            {/* Text */}
            <div>
              <span className="text-xl">Software Developer</span>
              <h1 className="h1 mb-6">
                Hello I'm <br />{" "}
                <span className="text-accent">Abhinav Yadav</span>
              </h1>
              <p className="max-w-[500px] mb-9 text-white/80">
                I excel at crafting elegant digital experiences and I am
                proficient in various programming languages and technologies.
              </p>
            </div>

            {/* Buttons and Socials */}
            <div className="flex flex-col xl:flex-row items-center gap-8  ">
              <Button
                variant="outline"
                size="lg"
                className="uppercase flex items-center gap-2"
                asChild
              >
                <a href="./abhinav-cv.pdf" download="Abhinav_Yadav_CV.pdf">
                  <span>Download CV</span>
                  <FiDownload className="text-xl" />
                </a>
              </Button>
              <div className="mb-8 xl:mb-0">
                <Socials
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                />
              </div>
            </div>
          </div>

          {/* Photo in its own row */}
          <div className=" order-1">
            <Photo />
          </div>
        </div>
      </div>
      <Stats />
    </section>
  );
};

export default Home;
