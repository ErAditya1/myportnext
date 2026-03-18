"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";

import profileImg from "@/assets/images/p2.jpg";

const AboutSection = () => {
  const imageRef = useRef(null);
  const textRef = useRef(null);

  // GSAP Animations
  useEffect(() => {
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1.3, ease: "power3.out" }
    );

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.3,
        delay: 0.4,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <section className="py-24 md:py-20 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 text-gray-800 dark:text-white shadow-lg">
      
      {/* Header */}
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold mb-4">About Me</h1>

        <hr className="border-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full w-1/2 md:w-1/3 mx-auto mb-4" />

        <p className="max-w-2xl mx-auto text-lg text-gray-700 dark:text-gray-300">
          A passionate Full Stack Developer focused on building scalable applications,
          optimizing performance, and delivering real business value through modern technologies.
        </p>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
        
        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          
          <motion.div
            ref={imageRef}
            className="rounded-full overflow-hidden shadow-2xl mb-6 w-80 h-80 border-4 border-white dark:border-gray-700"
          >
            <Image
              src={profileImg}
              alt="Durgesh Kumar Software Developer Barabanki India"
              width={320}
              height={320}
              priority
              className="object-cover w-full h-full"
            />
          </motion.div>

          {/* Title */}
          <motion.h2
            ref={textRef}
            className="text-xl font-semibold text-emerald-600 dark:text-emerald-400"
          >
            Software Developer | .NET & MERN Stack Specialist
          </motion.h2>

          {/* Tech Stack Line */}
          <motion.p
            className="text-sm text-gray-600 dark:text-gray-400 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            ASP.NET Core • C# • SQL Server • MongoDB • React • Node.js • REST APIs
          </motion.p>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2">
          
          <motion.p
            className="text-lg text-gray-700 dark:text-gray-300 mb-6"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <strong>Hello! I’m Durgesh Kumar,</strong> a results-driven Software Developer
            with hands-on experience building scalable, high-performance web applications
            using <strong>.NET technologies and the MERN stack</strong>. I specialize in backend
            engineering, REST API development, database optimization, and crafting responsive
            user experiences that solve real-world business problems.
          </motion.p>

          <motion.p
            className="text-lg text-gray-700 dark:text-gray-300 mb-6"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            With over <strong>1<sup>+</sup> Year  of industry experience</strong>, I have contributed to
            production-level applications, improved system performance by up to 30%, and built
            secure, maintainable software solutions. My expertise spans 
            <strong> ASP.NET Core, Entity Framework, SQL Server, MongoDB, Express.js,
            React, and Node.js</strong>, enabling me to deliver both enterprise-grade systems
            and modern full-stack platforms.
          </motion.p>

          <motion.p
            className="text-lg text-gray-700 dark:text-gray-300 mb-6"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            I approach development with a strong problem-solving mindset, focusing on clean
            architecture, efficient code, and scalable design patterns. Whether collaborating
            within Agile teams or working independently, I enjoy transforming complex ideas
            into reliable digital products.
          </motion.p>

          <motion.p
            className="text-lg text-gray-700 dark:text-gray-300 mb-8"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Currently pursuing my <strong>B.Tech in Computer Science</strong>, I continuously
            invest in learning emerging technologies and best practices to stay ahead in the
            rapidly evolving software industry.
          </motion.p>

          {/* CTA */}
          <motion.a
            href="/project"
            className="inline-block bg-emerald-600 text-white px-7 py-3 rounded-lg shadow-md hover:bg-emerald-800 transition hover:-translate-y-1 font-semibold"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4 }}
          >
            View My Projects 
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
