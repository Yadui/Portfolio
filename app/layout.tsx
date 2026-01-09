import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Components
import PageTransition from "@/components/PageTransition";
import TabPacman from "@/components/TabPacman";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});

export const metadata = {
  title: {
    default: "Abhinav · · · Yadav",
    template: "%s | Abhinav Yadav"
  },
  description: "Portfolio of Abhinav · · · Yadav, a passionate Software Engineer and Creative Developer.",
  keywords: ["Software Engineer", "Web Developer", "React", "Next.js", "Creative Developer", "Portfolio", "Abhinav Yadav", "Frontend", "Full Stack"],
  authors: [{ name: "Abhinav Yadav" }],
  creator: "Abhinav Yadav",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abhinavyadav.dev",
    siteName: "Abhinav Yadav Portfolio",
    title: "Abhinav Yadav | Software Engineer & Creative Developer",
    description: "Explore the portfolio of Abhinav Yadav, featuring creative web projects and software engineering expertise.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abhinav Yadav Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhinav Yadav | Software Engineer & Creative Developer",
    description: "Check out my latest projects and skills in web development.",
    creator: "@abhinavyadav88",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/pacman.svg",
    shortcut: "/pacman.svg",
    apple: "/pacman.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jetbrainsMono.variable}>
        <TabPacman />
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}