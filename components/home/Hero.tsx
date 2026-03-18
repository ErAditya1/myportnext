"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HiDownload, HiArrowRight } from "react-icons/hi";
import { FaLinkedinIn, FaGithub, FaTwitter, FaFacebookF } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-sky-500/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* LEFT — CONTENT */}
          <div className="w-full lg:w-3/5 text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-bold tracking-wider uppercase mb-6 border border-emerald-500/20">
                Available for New Projects
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6"
            >
              Crafting Digital <br />
              <span className="text-gradient">Experiences</span> that Matter
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              I&apos;m <span className="text-gray-900 dark:text-white font-bold">Durgesh Kumar</span>, a Full Stack Developer specializing in building high-performance solutions with <span className="text-emerald-500 font-semibold">.NET & MERN Stack</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-12"
            >
              <Link
                href="/contact"
                className="group px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold shadow-xl shadow-emerald-500/20 transition-all duration-300 flex items-center gap-2"
              >
                Hire Me Now
                <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="/Durgesh_Kumar_FullStack_Developer_Resume.pdf"
                download
                className="px-8 py-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 flex items-center gap-2 shadow-sm"
              >
                Resume
                <HiDownload className="animate-bounce" />
              </a>
            </motion.div>

            {/* SOCIAL */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex justify-center lg:justify-start gap-4"
            >
              {[
                { icon: <FaLinkedinIn />, link: "https://www.linkedin.com/in/getdurgeshkumar" },
                { icon: <FaGithub />, link: "https://github.com/DurgeshKumar143" },
                { icon: <FaTwitter />, link: "https://twitter.com/Durgeshk6393" },
                { icon: <FaFacebookF />, link: "https://www.facebook.com/profile.php?id=100036701271172" },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/50 transition-all duration-300 shadow-sm"
                >
                  <span className="text-xl">{item.icon}</span>
                </a>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — IMAGE */}
          <div className="w-full lg:w-2/5 flex justify-center order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              {/* Decorative rings */}
              <div className="absolute -inset-4 border-2 border-emerald-500/20 rounded-[40px] animate-float" />
              <div className="absolute -inset-8 border border-sky-500/10 rounded-[50px] animate-float shadow-2xl" style={{ animationDelay: '1s' }} />
              
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border-4 border-white dark:border-gray-800 bg-emerald-500/5">
                <Image
                  src="https://res.cloudinary.com/durgeshkumar/image/upload/f_auto,q_auto/v1771091150/finalsecond_t21tkd.png"
                  alt="Durgesh Kumar"
                  fill
                  priority
                  className="object-cover scale-110 hover:scale-125 transition-transform duration-700"
                />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
