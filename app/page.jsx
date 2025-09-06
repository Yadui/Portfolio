import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import Stats from "@/components/Stats";

//components
import Socials from "@/components/Socials";

const Home = () => {
  return (
    <>
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-black to-gray-900">
        <div className="container mx-auto flex flex-col items-center justify-center h-full">
          {/* Main content, vertically stacked */}
          <div className="flex flex-col items-center justify-center space-y-8 w-full">
            {/* Text and Socials in one column, centered */}
            <div className="flex flex-col items-center text-center space-y-8 w-full">
              {/* Text */}
              <div className="space-y-4">
                <span className="text-xl text-accent tracking-widest animate-fadeIn">
                  Software Developer
                </span>
                <h1 className="h1 mb-0 animate-slideUp">
                  Hello I'm <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-purple-500">
                    Abhinav Yadav
                  </span>
                </h1>
                <p className="max-w-xl mx-auto text-lg text-white/70 font-light animate-fadeIn">
                  I excel at crafting elegant digital experiences and I am
                  proficient in various programming languages and technologies.
                </p>
                <div className="w-32 h-[2px] bg-accent mx-auto mb-8"></div>
              </div>
              <div className="flex justify-center">
                <div className="transition-transform hover:scale-110">
                  <Socials
                    containerStyles="flex gap-6"
                    iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                  />
                </div>
              </div>
              <div className="w-32 h-[2px] bg-accent mx-auto mb-8"></div>

              <div className="w-full flex justify-center">
                <Stats />
              </div>
              <div className="w-32 h-[2px] bg-accent mx-auto mb-8"></div>
              {/* Buttons and Socials */}
              <div className="flex flex-col items-center space-y-8 w-full">
                <Button
                  variant="outline"
                  size="lg"
                  className="uppercase flex items-center gap-2 backdrop-blur-lg bg-white/10 border border-white/20 transition-colors duration-200"
                  asChild
                >
                  <a href="./abhinav-cv.pdf" download="Abhinav_Yadav_CV.pdf">
                    <span>Download CV</span>
                    <FiDownload className="text-xl" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
