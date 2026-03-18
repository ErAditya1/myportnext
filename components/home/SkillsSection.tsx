"use client";

import { motion } from "framer-motion";
import { HiLightningBolt, HiChip, HiCloud, HiDatabase, HiCode, HiShieldCheck } from "react-icons/hi";

const techSkills = [
  { name: "ASP.NET Core", level: 92, icon: <HiChip />, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { name: "React / Next.js", level: 90, icon: <HiCode />, color: "text-sky-500", bg: "bg-sky-500/10" },
  { name: "Node.js", level: 87, icon: <HiLightningBolt />, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { name: "SQL / MongoDB", level: 89, icon: <HiDatabase />, color: "text-rose-500", bg: "bg-rose-500/10" },
  { name: "REST APIs", level: 93, icon: <HiCloud />, color: "text-indigo-500", bg: "bg-indigo-500/10" },
  { name: "System Design", level: 80, icon: <HiShieldCheck />, color: "text-amber-500", bg: "bg-amber-500/10" },
];

const strengths = [
  {
    title: "Team Leadership",
    desc: "Led modules and collaborated with cross-functional teams to deliver production-ready applications.",
    icon: "👨‍💼",
  },
  {
    title: "Time Management",
    desc: "Delivered features within sprint timelines while maintaining high engineering standards.",
    icon: "⏳",
  },
  {
    title: "Problem Solving",
    desc: "Strong debugging mindset with the ability to resolve complex system challenges.",
    icon: "🧠",
  },
  {
    title: "Ownership",
    desc: "Take responsibility for architecture, performance, and deployment.",
    icon: "🚀",
  },
];

export default function SkillsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* SECTION HEADER */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold mb-6"
          >
            Engineering <span className="text-gradient">Stacks</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg"
          >
            High-performance technologies I leverage to build scalable, 
            production-level digital systems.
          </motion.p>
        </div>

        {/* TECH SKILLS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {techSkills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass p-8 rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-xl relative group"
            >
              <div className={`w-16 h-16 rounded-2xl ${skill.bg} ${skill.color} flex items-center justify-center text-3xl mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                {skill.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-4 dark:text-white">{skill.name}</h3>
              
              {/* Progress Line */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-gray-500">Proficiency</span>
                  <span className={skill.color}>{skill.level}%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CORE STRENGTHS */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold mb-4"
          >
            Core <span className="text-gradient">Strengths</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {strengths.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-3xl border border-gray-100 dark:border-white/5 flex gap-6 items-start hover:bg-white/50 dark:hover:bg-gray-800/5 transition-colors"
            >
              <div className="text-4xl bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl shadow-inner">
                {item.icon}
              </div>
              <div>
                <h3 className="text-xl font-extrabold mb-2 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
