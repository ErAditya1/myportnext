import AboutSection from "../../components/home/AboutSection";

export const metadata = {
  title: "About Durgesh Kumar | .NET & MERN Stack Developer | Full Stack Engineer",

  description:
    "Durgesh Kumar is a professional Full Stack Developer specializing in ASP.NET Core, MERN Stack, React, Node.js, and SQL. Explore his experience, technical expertise, and software engineering journey.",

  keywords: [
    "Durgesh Kumar",
    "Durgesh Kumar developer",
    ".NET Developer India",
    "MERN Stack Developer",
    "Full Stack Developer Portfolio",
    "ASP.NET Core Developer",
    "React Developer",
    "Software Engineer India",
    "Backend Developer",
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
    locale: "en_US",
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
    sameAs: [
      "https://github.com/DurgeshKumar143",
      "https://www.linkedin.com/in/durgesh-kumar-b8385b234",
    ],
  };
  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <AboutSection />
    </main>
  );
};

export default Page;
