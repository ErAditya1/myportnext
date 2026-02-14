"use client";

import { motion } from "framer-motion";

const techSkills = [
  { name: "ASP.NET Core", level: 92 },
  { name: "React / Next.js", level: 90 },
  { name: "Node.js", level: 87 },
  { name: "SQL / MongoDB", level: 89 },
  { name: "REST APIs", level: 93 },
  { name: "System Design", level: 80 },
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

const radius = 45;
const circumference = 2 * Math.PI * radius;

export default function SkillsSection() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
      
      <div className="max-w-7xl mx-auto px-6">

        {/* ========================= */}
        {/* TECH SKILLS */}
        {/* ========================= */}

        <h2 className="text-4xl font-bold text-center mb-4">
          Engineering Expertise
        </h2>

        <p className="text-center text-gray-600 dark:text-gray-300 mb-16">
          Technologies I use to build scalable, production-grade systems.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mb-28">

          {techSkills.map((skill, i) => {
            const offset =
              circumference - (skill.level / 100) * circumference;

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.07 }}
                className="backdrop-blur-lg bg-white/40 dark:bg-gray-900/40 rounded-2xl p-6 shadow-xl flex flex-col items-center"
              >
                <div className="relative w-28 h-28 mb-4">
                  <svg className="-rotate-90" width="120" height="120">
                    <circle
                      cx="60"
                      cy="60"
                      r={radius}
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-gray-300 dark:text-gray-700"
                    />

                    <motion.circle
                      cx="60"
                      cy="60"
                      r={radius}
                      stroke="url(#grad)"
                      strokeWidth="8"
                      fill="transparent"
                      strokeLinecap="round"
                      initial={{ strokeDashoffset: circumference }}
                      whileInView={{ strokeDashoffset: offset }}
                      transition={{ duration: 1.6 }}
                      style={{
                        strokeDasharray: circumference,
                      }}
                    />

                    <defs>
                      <linearGradient id="grad">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#6366f1" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <div className="absolute inset-0 flex items-center justify-center font-bold">
                    {skill.level}%
                  </div>
                </div>

                <h3 className="font-semibold text-center">
                  {skill.name}
                </h3>
              </motion.div>
            );
          })}
        </div>

        {/* ========================= */}
        {/* CORE STRENGTHS */}
        {/* ========================= */}

        <h2 className="text-4xl font-bold text-center mb-4">
          Core Strengths
        </h2>

        <p className="text-center text-gray-600 dark:text-gray-300 mb-16">
          The qualities that make me a reliable engineer and strong team contributor.
        </p>

        <div className="grid md:grid-cols-2 gap-8">

          {strengths.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl flex gap-4"
            >
              <div className="text-4xl">{item.icon}</div>

              <div>
                <h3 className="text-xl font-bold mb-2">
                  {item.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400">
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
