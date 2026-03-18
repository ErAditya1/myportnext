"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HiArrowRight, HiSparkles } from "react-icons/hi";

const AboutSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4 border border-emerald-500/20"
          >
            <HiSparkles className="text-emerald-500" />
            My Journey
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold mb-6"
          >
            Passionate About <span className="text-gradient">Innovating</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl text-gray-600 dark:text-gray-400 text-lg leading-relaxed"
          >
            I build bridges between complex backend architectures and intuitive frontend experiences, 
            driven by a pursuit of performance and clean code.
          </motion.p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT — IMAGE & QUICK INFO */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-900 aspect-square max-w-md mx-auto">
              <Image
                src="https://res.cloudinary.com/durgeshkumar/image/upload/f_auto,q_auto/v1771091150/finalsecond_t21tkd.png" // Re-using the known good cloud image
                alt="Durgesh Kumar"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -right-6 lg:right-0 glass p-6 rounded-3xl shadow-xl z-20 border border-emerald-500/20 flex flex-col items-center animate-float">
              <span className="text-3xl font-bold text-emerald-500">1+</span>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Year Experience</span>
            </div>
            
            <div className="absolute -top-6 -left-6 glass p-5 rounded-2xl shadow-xl z-20 border border-sky-500/20 flex flex-col items-center animate-float" style={{ animationDelay: '1.5s' }}>
              <span className="text-2xl font-bold text-sky-500">30%</span>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter text-center">Efficiency<br/>Boost</span>
            </div>
          </motion.div>

          {/* RIGHT — DETAILED BIO */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold dark:text-white flex items-center gap-3">
                <span className="w-10 h-1 h-px bg-emerald-500" />
                Who I Am
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                <strong>Hello! I’m Durgesh Kumar</strong>, a results-driven Software Developer specializing in 
                <span className="text-gray-900 dark:text-white font-semibold"> .NET Technologies and the MERN Stack</span>. 
                I focus on architecting robust backend systems and crafting seamless user interfaces.
              </p>

              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                My technical journey is rooted in a problem-solving mindset. From optimizing SQL queries to designing 
                highly responsive React components, I strive to deliver enterprise-grade performance in every line of code.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                  <h4 className="font-bold text-emerald-500 mb-1">Architecture</h4>
                  <p className="text-xs text-gray-500">Focused on Clean Principles & Design Patterns</p>
                </div>
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                  <h4 className="font-bold text-sky-500 mb-1">Security</h4>
                  <p className="text-xs text-gray-500">Implementing JWT, OAuth & Secure API Practices</p>
                </div>
              </div>

              <div className="pt-8">
                <Link
                  href="/project"
                  className="group inline-flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400 hover:gap-4 transition-all duration-300"
                >
                  Explore My Work Portfolio
                  <HiArrowRight />
                </Link>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
