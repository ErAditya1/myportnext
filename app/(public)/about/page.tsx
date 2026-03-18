import AboutSection from "@/components/home/AboutSection";
 

import StructuredData from "@/components/seo/StructuredData"



export const metadata = {
  title: "About Durgesh Kumar | Full Stack Developer in Barabanki (.NET & MERN)",

  description:
    "Durgesh Kumar is a professional Full Stack Developer specializing in ASP.NET Core, MERN Stack, React, Node.js, and SQL. Explore his experience, technical expertise, and software engineering journey.",
keywords: [
  "Durgesh Kumar",
  "Durgesh Kumar Barabanki",
  "software developer barabanki",
  "full stack developer barabanki",
  ".NET Developer India",
  "MERN Stack Developer",
  "ASP.NET Core Developer",
  "React Developer",
  "Software Engineer India",
  "Durgesh Kumar portfolio",
],

  authors: [{ name: "Durgesh Kumar" }],
  creator: "Durgesh Kumar",
  publisher: "Durgesh Kumar",

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://officialdurgesh.vercel.app/about",
  },

  openGraph: {
    title: "About Durgesh Kumar | Full Stack Developer (.NET + MERN)",
    description:
      "Discover Durgesh Kumar — a Full Stack Software Developer skilled in ASP.NET Core, MERN Stack, REST APIs, and scalable web applications.",
    url: "https://officialdurgesh.vercel.app/about",
    siteName: "Durgesh Kumar Portfolio",
    images: [
      {
        url: "https://officialdurgesh.vercel.app/image/Home.jpeg", 
        width: 1200,
        height: 630,
        alt: "Durgesh Kumar Full Stack Developer",
      },
    ],
    locale: "en_IN",
    type: "profile",
  },

  twitter: {
    card: "summary_large_image",
    title: "Durgesh Kumar | Full Stack Developer",
    description:
      "Full Stack Developer specializing in .NET, MERN Stack, React, and scalable backend systems.",
    images: ["https://officialdurgesh.vercel.app/image/Home.jpeg"],
  },
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
     "text": "Durgesh Kumar is a Full Stack Developer based in Barabanki specializing in ASP.NET Core, MERN stack and scalable web applications."
   }
  },
  {
   "@type": "Question",
   "name": "Where is Durgesh Kumar located?",
   "acceptedAnswer": {
     "@type": "Answer",
     "text": "Durgesh Kumar is located in Barabanki, Uttar Pradesh, India."
   }
  },
  {
   "@type": "Question",
   "name": "What technologies does Durgesh Kumar use?",
   "acceptedAnswer": {
     "@type": "Answer",
     "text": "Durgesh Kumar works with ASP.NET Core, React, Next.js, Node.js, MongoDB and SQL Server."
   }
  },
  {
   "@type": "Question",
   "name": "Can I hire Durgesh Kumar?",
   "acceptedAnswer": {
     "@type": "Answer",
     "text": "Yes, Durgesh Kumar is available for freelance, remote and full-time development work."
   }
  }
 ]
};

const Page = () => {
  const personSchema = {
 "@context": "https://schema.org",
 "@type": "Person",
 name: "Durgesh Kumar",
 url: "https://officialdurgesh.vercel.app",
 image: "https://officialdurgesh.vercel.app/image/Home.jpeg",
 jobTitle: "Full Stack Developer",

 description:
  "Full Stack Developer specializing in ASP.NET Core, MERN Stack, React, Node.js, and scalable web applications.",

 address: {
  "@type": "PostalAddress",
  addressLocality: "Barabanki",
  addressRegion: "Uttar Pradesh",
  addressCountry: "India"
 },

 sameAs: [
  "https://github.com/DurgeshKumar143",
  "https://www.linkedin.com/in/durgesh-kumar-b8385b234",
 ],
};

const breadcrumbSchema = {
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 itemListElement: [
  {
   "@type": "ListItem",
   position: 1,
   name: "Home",
   item: "https://officialdurgesh.vercel.app"
  },
  {
   "@type": "ListItem",
   position: 2,
   name: "About",
   item: "https://officialdurgesh.vercel.app/about"
  }
 ]
};
  return (
    <>
    

    <StructuredData data={faqSchema} />
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{
  __html: JSON.stringify(breadcrumbSchema),
 }}
/>


      <AboutSection />
    </main>
    
    
    </>
  );
};

export default Page;
