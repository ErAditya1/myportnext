import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { ThemeProvider } from "next-themes";
import { SpeedInsights } from "@vercel/speed-insights/next"


// ✅ Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


// ✅ MASTER SEO METADATA
export const metadata: Metadata = {
  metadataBase: new URL("https://officialdurgesh.vercel.app"),

  title: {
    default: "Durgesh Kumar | Full Stack Developer (.NET & MERN)",
    template: "%s | Durgesh Kumar",
  },

  verification: {
    google: "google3afd91eb287e8099",
  },

  icons: {
    icon: "/icon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.jpg",
  },

description:
  "Durgesh Kumar is a highly skilled Full Stack Developer specializing in ASP.NET Core, .NET, React, Next.js, and MERN Stack. Recognized for building scalable, secure, and production-ready web applications. Explore the portfolio of Durgesh Kumar, view innovative projects, and connect for freelance, remote, or full-time opportunities.",

 keywords: [
  "Durgesh Kumar",
  "Durgesh Kumar Full Stack Developer",
  "ASP.NET Developer Durgesh Kumar",
  ".NET Developer Durgesh Kumar",
  "React Developer Durgesh Kumar",
  "Next.js Developer Durgesh Kumar",
  "MERN Stack Developer Durgesh Kumar",
  "Software Engineer Durgesh Kumar",
  "Hire Durgesh Kumar",
  "Freelance Developer Durgesh Kumar",
  "Durgesh Kumar Portfolio",
  "Full Stack Developer in India Durgesh Kumar",
  "Remote Developer Durgesh Kumar",
],

  authors: [
    {
      name: "Durgesh Kumar",
      url: "https://officialdurgesh.vercel.app",
    },
  ],

  creator: "Durgesh Kumar",
  publisher: "Durgesh Kumar",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "Durgesh Kumar | Full Stack Developer (.NET & MERN)",
    description:
      "Explore the portfolio of Durgesh Kumar — Full Stack Developer building scalable, high-performance applications using modern technologies.",
    url: "https://officialdurgesh.vercel.app",
    siteName: "Durgesh Kumar Portfolio",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/durgeshimage.jpg.png", // put inside public folder
        width: 1200,
        height: 630,
        alt: "Durgesh Kumar Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Durgesh Kumar | Full Stack Developer",
    description:
      "Portfolio showcasing projects, engineering skills, and modern web development expertise.",
    images: ["/durgeshimage.jpg"],
  },

  alternates: {
    canonical: "https://officialdurgesh.vercel.app",
  },

  category: "technology",
};



// ✅ ROOT LAYOUT
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>

 
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Durgesh Kumar",
              url: "https://officialdurgesh.vercel.app",
              image: "https://officialdurgesh.vercel.app/durgeshimage.jpg",
              jobTitle: "Full Stack Developer || .NET Developer",
              sameAs: [
                "https://github.com/DurgeshKumar143",
                "https://www.linkedin.com/in/getdurgeshkumar",
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "India",
              },
            }),
          }}
        />

        {/* Accessibility Boost */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:bg-white focus:text-black focus:px-3 focus:py-2 focus:rounded"
        >
          Skip to main content
        </a>

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <SpeedInsights />
          <Footer />
        </ThemeProvider>

      </body>
    </html>
  );
}
