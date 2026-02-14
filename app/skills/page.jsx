import SkillsSection from "@/components/home/SkillsSection";
import StructuredData from "@/components/seo/StructuredData";

export const metadata = {
  title: "Technical Skills | Durgesh Kumar Full Stack Developer",
  description:
    "Explore the technical skills of Durgesh Kumar including ASP.NET Core, MERN Stack, React, Node.js, SQL, MongoDB, REST APIs, and scalable system design.",
    
  keywords: [
    "Durgesh Kumar skills",
    "Full Stack Developer skills",
    "ASP.NET Core Developer",
    "MERN Stack Developer",
    "React Developer Portfolio",
    "Node.js Developer",
    "Software Engineer Skills",
  ],

  alternates: {
    canonical: "https://officialdurgesh.vercel.app/skills",
  },

  openGraph: {
    title: "Technical Skills | Durgesh Kumar",
    description:
      "Discover the engineering expertise and technical strengths of Full Stack Developer Durgesh Kumar.",
    url: "https://officialdurgesh.vercel.app/skills",
    siteName: "Durgesh Kumar Portfolio",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Technical Skills | Durgesh Kumar",
    description:
      "Engineering expertise including .NET, MERN, React, Node.js, and scalable backend development.",
  },
};

const SkillsPage = () => {
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Durgesh Kumar",
    url: "https://officialdurgesh.vercel.app",
    jobTitle: "Full Stack Developer",
    knowsAbout: [
      "ASP.NET Core",
      "React",
      "Node.js",
      "MongoDB",
      "SQL Server",
      "REST APIs",
      "System Design",
    ],
  };

  return (
    <>
      <StructuredData data={schema} />

      <main id="main-content">
        <SkillsSection />
      </main>
    </>
  );
};

export default SkillsPage;
