"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import profileImg from "@/assets/images/p1.jpg";

const Hero = () => {
  return (
    <section className="min-h-screen py-20 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-50 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 flex items-center justify-center overflow-hidden">
      
      <div className="max-w-6xl mx-auto px-4 w-full flex flex-col md:flex-row items-center justify-between gap-12">

        {/* LEFT — IMAGE */}
        <div className="w-full md:w-1/2 flex justify-center  md:justify-start">
          <motion.div
            initial={{ opacity: 0, x: -120 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-gray-200 dark:border-gray-700"
          >
           import Image from "next/image";

<Image
  src="https://res.cloudinary.com/durgeshkumar/image/upload/f_auto,q_auto/v1771091150/finalsecond_t21tkd.png"
  alt="Durgesh Kumar Full Stack Developer from Barabanki India"
  fill
  priority
  sizes="(max-width: 768px) 220px, (max-width: 1024px) 260px, 320px"
  quality={85}
  className="object-cover"
/>
          </motion.div>
        </div>

        {/* RIGHT — CONTENT */}
        <div className="w-full md:w-1/2 text-center md:text-left max-w-xl">

          <motion.span
            className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Software Developer Portfolio
          </motion.span>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mt-2"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Hi, I’m{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              Durgesh Kumar
            </span>
            <br />
            <span className="text-xl sm:text-2xl md:text-3xl font-semibold">
              Full Stack Developer (.NET & MERN)
            </span>
          </motion.h1>

          <motion.p
            className="mt-5 text-base sm:text-lg text-gray-700 dark:text-gray-300"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Results-driven Software Developer with experience building scalable,
            high-performance applications using{" "}
            <strong>ASP.NET Core, React, Node.js, and SQL Server.</strong>
            Specialized in REST APIs, database optimization, and delivering
            production-ready solutions.
          </motion.p>

          <motion.p
            className="mt-3 text-sm text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ASP.NET Core • C# • MERN • REST APIs • MongoDB • SQL • Next.js
          </motion.p>

          {/* BUTTONS */}
          <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-4">

            <a
              href="/Durgesh_Kumar_FullStack_Developer_Resume.pdf"
              download
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-emerald-700 transition"
            >
              Download Resume
            </a>

            <Link
              href="/contact"
              className="border-2 border-sky-500 bg-white dark:bg-gray-900 text-sky-500 px-6 py-3 rounded-lg shadow-lg hover:bg-sky-500 hover:text-white transition"
            >
              Hire Me
            </Link>

          </div>

          {/* SOCIAL */}
          <div className="mt-8 flex justify-center md:justify-start gap-5">
            {[
              {
                icon: "fab fa-linkedin-in",
                link: "https://www.linkedin.com/in/getdurgeshkumar",
              },
              {
                icon: "fab fa-github",
                link: "https://github.com/DurgeshKumar143",
              },
              {
                icon: "fab fa-twitter",
                link: "https://twitter.com/Durgeshk6393",
              },
              {
                icon: "fab fa-facebook-f",
                link: "https://www.facebook.com/profile.php?id=100036701271172",
              },
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 dark:text-white hover:text-rose-500 transition text-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 * index }}
              >
                <i className={item.icon}></i>
              </motion.a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
