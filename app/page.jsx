"use client";
import { useRef } from "react";

//components
import Header from "@/components/Header";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Timeline from "@/components/Timeline";
import Skills from "@/components/Skills";


const Home = () => {
  const arrowRef = useRef(null);
  const whatIDoRef = useRef(null);

  return (
    <div>
      <Header arrowRef={arrowRef} />
      <Projects arrowRef={arrowRef} whatIDoRef={whatIDoRef} />
      <Timeline />
      <Skills />
      <Contact />
    </div>
  );  
};

export default Home;
