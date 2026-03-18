import ContactSection from "@/components/home/ContactSection";


// ✅ SEO Metadata
export const metadata = {
  title: "Contact Durgesh kumar | Full Stack Developer",
  description:
    "Get in touch with Nick, a Full Stack Developer specializing in modern web applications. Available for freelance, full-time roles, and collaborations.",

  keywords: [
    "Contact Full Stack Developer",
    "Hire Web Developer",
    "Freelance Developer",
    "Next.js Developer",
    "React Developer",
    "Er Durgesh kumar .Net developer",
    ".Net Developer",
    "Er Durgesh kumar"
  ],

  openGraph: {
    title: "Contact Nick | Full Stack Developer",
    description:
      "Reach out to Nick for web development projects, freelance work, or job opportunities.",
    url: "https://officialdurgesh.vercel.app/contact",
    siteName: "Durgesh kumar Portfolio",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const ContactPage = () => {
  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Nick",
            description:
              "Contact Nick for web development services, freelance projects, or job opportunities.",
            url: "https://officialdurgesh.vercel.app/contact",
            mainEntity: {
              "@type": "Person",
              name: "Durgesh kumar",
              jobTitle: "Full Stack Developer",
              url: "https://officialdurgesh.vercel.app/",
            },
          }),
        }}
      />
      <ContactSection />
    </main>
  );
};

export default ContactPage;
