"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaEnvelope, FaMapMarkedAlt, FaLinkedin } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const info = [
  {
    icon: <FaLinkedin />,
    title: "LinkedIn",
    description: "View Profile",
    link: "https://www.linkedin.com/in/abhinavyadav88",
    isExternal: true,
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "abhinavyadav8+port@gmail.com",
    link: "mailto:abhinavyadav8+port@gmail.com",
    isExternal: false,
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "Location",
    description: "Gurugram, Haryana",
    link: null,
    isExternal: false,
  },
];

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const containerRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      },
    });

    tl.to(".contact-content", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    });

  }, { scope: containerRef });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
        setStatus({ type: "error", message: "Please fill in all fields." });
        return;
    }

    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: name, // Mapping to existing API structure if needed, or update API
          email,
          message,
          to: "abhinavyadav8+port@gmail.com",
        }),
      });

      if (res.ok) {
        setStatus({ type: "success", message: "Message sent successfully!" });
        form.reset();
      } else {
        setStatus({ type: "error", message: "Failed to send message." });
      }
    } catch (error) {
      setStatus({ type: "error", message: "An error occurred." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-24 relative bg-black/20"
    >
       <div className="container mx-auto">
         <div className="contact-content opacity-0 translate-y-12 flex flex-col xl:flex-row gap-16">
           
           {/* Info Section */}
           <div className="flex-1 flex flex-col gap-10 order-2 xl:order-1">
             <div className="space-y-4">
                 <h3 className="text-4xl font-bold text-white">Let's Connect</h3>
                 <p className="text-white/60 text-lg leading-relaxed max-w-md">
                     I'm currently available for freelance work or full-time opportunities. 
                     If you have a project that needs some creative touch, let's talk.
                 </p>
             </div>
             
             <ul className="flex flex-col gap-8">
               {info.map((item, index) => (
                 <li key={index} className="flex items-center gap-6 group">
                   <div className="w-[60px] h-[60px] bg-zinc-900 border border-white/10 text-accent rounded-xl flex items-center justify-center group-hover:border-accent/50 group-hover:shadow-[0_0_20px_rgba(0,255,153,0.2)] transition-all duration-300">
                       <div className="text-2xl">{item.icon}</div>
                   </div>
                   <div className="flex-1">
                       <p className="text-white/40 mb-1 text-xs uppercase tracking-widest font-bold">{item.title}</p>
                       {item.link ? (
                           <a href={item.link} target={item.isExternal ? "_blank" : "_self"} className="text-lg font-medium text-white hover:text-accent transition-colors">
                               {item.description}
                           </a>
                       ) : (
                           <h3 className="text-lg font-medium text-white">{item.description}</h3>
                       )}
                   </div>
                 </li>
               ))}
             </ul>
           </div>

           {/* Form Section */}
           <div className="flex-1 order-1 xl:order-2">
             <form
               className="flex flex-col gap-6 p-8 md:p-12 bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-[32px] shadow-2xl"
               onSubmit={handleSubmit}
             >
               <h3 className="text-2xl font-bold text-accent mb-2">Send a Message</h3>
               
               <div className="flex flex-col gap-6">
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-white/60 ml-2">Name</label>
                    <Input name="name" type="text" placeholder="John Doe" className="bg-black/50 border-white/10 focus:border-accent rounded-xl h-14 text-white placeholder:text-white/20" required />
                 </div>
                 
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-white/60 ml-2">Email</label>
                    <Input name="email" type="email" placeholder="john@example.com" className="bg-black/50 border-white/10 focus:border-accent rounded-xl h-14 text-white placeholder:text-white/20" required />
                 </div>

                 <div className="space-y-2">
                    <label className="text-sm font-medium text-white/60 ml-2">Message</label>
                    <Textarea
                        name="message"
                        className="min-h-[180px] bg-black/50 border-white/10 focus:border-accent resize-none rounded-xl p-4 text-white placeholder:text-white/20"
                        placeholder="Hello, I'd like to talk about..."
                        required
                    />
                 </div>
               </div>

               <Button size="lg" className="w-full bg-accent text-primary hover:bg-accent/90 transition-all rounded-xl font-bold text-lg h-14 mt-4" disabled={loading}>
                 {loading ? (
                   <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                 ) : (
                   "Send Message"
                 )}
               </Button>
               
               {status && (
                 <div 
                     className={`text-sm mt-2 p-4 rounded-xl text-center font-medium ${status.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}
                 >
                     {status.message}
                 </div>
               )}
             </form>
           </div>

         </div>
       </div>
    </section>
  );
};

export default Contact;
