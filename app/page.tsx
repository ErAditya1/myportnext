import type { Metadata } from "next";

import Hero from "../components/home/Hero";
import AboutSection from "../components/home/AboutSection";
import SkillsSection from "../components/home/SkillsSection";
import ServicesSection from "../components/home/ServicesSection";
import ProjectSection from "../components/project/ProjectsSection";
import ContactSection from "../components/home/ContactSection";
import BlogSection from "../components/home/BlogSection";
import RecruiterCTA from "../components/home/RecruiterCTA";
import StructuredData from "../components/seo/StructuredData";


// ✅ HOMEPAGE SEO (VERY IMPORTANT)
export const metadata: Metadata = {
  title: "Durgesh Kumar | Full Stack Developer (.NET & MERN)",
  
  description:
    "Official portfolio of Durgesh Kumar — a Full Stack Developer specializing in ASP.NET Core, MERN Stack, React, Next.js, and scalable web application development.",

  keywords: [
    "Durgesh Kumar",
    "Full Stack Developer Portfolio",
    ".NET Developer Durgesh kumar",
    "MERN Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Software Developer India",
    "Backend Developer",
    "Er Durgesh kumar"
  ],

  alternates: {
    canonical: "https://officialdurgesh.vercel.app",
  },
};



export default function Home() {

  // ✅ PERSON SCHEMA
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Durgesh Kumar || Er Durgesh Kumar",
    jobTitle: "Full Stack Developer",
    url: "https://officialdurgesh.vercel.app",
    image: "https://res.cloudinary.com/durgeshkumar/image/upload/v1771091150/finalsecond_t21tkd.png",

    sameAs: [
      "https://github.com/DurgeshKumar143",
      "https://www.linkedin.com/in/getdurgeshkumar",
    ],

    knowsAbout: [
      "ASP.NET Core",
      "MERN Stack",
      "React",
      "Next.js",
      "Node.js",
      "SQL Server",
      "MongoDB",
      "REST APIs",
      "Full Stack Development",
    ],
  };


  // ✅ WEBSITE SCHEMA (ADVANCED SEO)
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Durgesh Kumar Portfolio",
    url: "https://officialdurgesh.vercel.app",
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://officialdurgesh.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };


  return (
    <>
      {/* Structured Data */}
      <StructuredData data={personSchema} />
      <StructuredData data={websiteSchema} />

      <main id="main-content">
        <Hero />
        <AboutSection />
        <SkillsSection />
        <ServicesSection />
        <ProjectSection />
        {/* <BlogSection />
        <RecruiterCTA /> */}
        <ContactSection />
      </main>
    </>
  );
}
