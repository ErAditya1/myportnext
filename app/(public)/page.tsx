import type { Metadata } from "next";

import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import SkillsSection from "@/components/home/SkillsSection";
import ServicesSection from "@/components/home/ServicesSection";
import ProjectSection from "@/components/project/ProjectsSection";
import ContactSection from "@/components/home/ContactSection";
import BlogSection from "@/components/home/BlogSection";
import RecruiterCTA from "@/components/home/RecruiterCTA";
import StructuredData from "@/components/seo/StructuredData";


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
  name: "Durgesh Kumar",
  jobTitle: "Full Stack Developer",
  url: "https://officialdurgesh.vercel.app",
  image: "https://res.cloudinary.com/durgeshkumar/image/upload/v1771091150/finalsecond_t21tkd.png",

  address: {
    "@type": "PostalAddress",
    addressLocality: "Barabanki",
    addressRegion: "Uttar Pradesh",
    addressCountry: "India"
  },

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

  // ✅ LOCAL SEO SCHEMA
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Durgesh Kumar - Software Developer",
  image: "https://officialdurgesh.vercel.app/durgeshimage.jpg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Barabanki",
    addressRegion: "Uttar Pradesh",
    addressCountry: "India"
  },
  url: "https://officialdurgesh.vercel.app",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [

    {
      "@type": "Question",
      "name": "Who is Durgesh Kumar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Durgesh Kumar is a Full Stack Developer based in Barabanki, Uttar Pradesh, India. He specializes in ASP.NET Core, MERN stack, React, Next.js, and scalable web application development."
      }
    },

    {
      "@type": "Question",
      "name": "What technologies does Durgesh Kumar use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Durgesh Kumar works with ASP.NET Core, .NET, React, Next.js, Node.js, MongoDB, SQL Server, and modern full stack development tools."
      }
    },

    {
      "@type": "Question",
      "name": "Where is Durgesh Kumar located?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Durgesh Kumar is a software developer based in Barabanki, Uttar Pradesh, India and works with clients remotely worldwide."
      }
    },

    {
      "@type": "Question",
      "name": "Can I hire Durgesh Kumar for freelance projects?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Durgesh Kumar is available for freelance, remote, and full-time software development opportunities."
      }
    },

    {
      "@type": "Question",
      "name": "What type of applications does Durgesh Kumar build?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Durgesh Kumar builds scalable web applications, REST APIs, enterprise systems, dashboards, and full stack applications using ASP.NET Core and MERN stack."
      }
    },

    {
      "@type": "Question",
      "name": "How can I contact Durgesh Kumar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can contact Durgesh Kumar through the contact form on his portfolio website or through LinkedIn and GitHub."
      }
    },

    {
      "@type": "Question",
      "name": "Does Durgesh Kumar work remotely?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Durgesh Kumar works remotely with clients globally and is open to remote software development opportunities."
      }
    }

  ]
};


  return (
    <>
      {/* Structured Data */}
      <StructuredData data={personSchema} />
      <StructuredData data={websiteSchema} />

      <StructuredData data={localBusinessSchema}  />

      <StructuredData data={faqSchema} />

      <main id="main-content">
        <Hero />
        <AboutSection />
        <SkillsSection />
        <ServicesSection />
        <ProjectSection />
        <BlogSection />
        <RecruiterCTA />
        <ContactSection />
      </main>
    </>
  );
}
