//components
import Header from "@/components/Header";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Timeline from "@/components/Timeline";
import Skills from "@/components/Skills";


const Home = () => {
  return (
    <div>
      <Header />
      <Projects />
      <Timeline />
      <Skills />
      <Contact />
    </div>
  );  
};

export default Home;
