"use client";

import { motion } from "framer-motion";
import { Server, Database, Cpu, Layers, ShieldCheck, Zap } from "lucide-react";

const expertise = [
  {
    title: "Backend Engineering",
    description: "Designing secure, scalable backend systems using .NET and Node.js with a strong focus on clean architecture.",
    icon: Server,
    color: "from-emerald-500 to-teal-500"
  },
  {
    title: "API Architecture",
    description: "Building high-performance REST APIs with robust authentication and optimized production-ready error handling.",
    icon: ShieldCheck,
    color: "from-sky-500 to-blue-500"
  },
  {
    title: "Database Optimization",
    description: "Improving application speed through advanced SQL tuning, indexing strategies, and efficient schema design.",
    icon: Database,
    color: "from-indigo-500 to-purple-500"
  },
  {
    title: "Full Stack Systems",
    description: "Delivering end-to-end applications using React, Next.js, and modern backend frameworks engineered for scale.",
    icon: Layers,
    color: "from-rose-500 to-pink-500"
  },
  {
    title: "System Design",
    description: "Architecting modular systems that support long-term product growth and evolving business requirements.",
    icon: Cpu,
    color: "from-amber-500 to-orange-500"
  },
  {
    title: "Performance",
    description: "Reducing latency, optimizing load times, and ensuring applications remain fast under heavy traffic.",
    icon: Zap,
    color: "from-violet-500 to-fuchsia-500"
  },
];

const ServicesSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold mb-6"
          >
            Software <span className="text-gradient">Solutions</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg"
          >
            I specialize in building production-ready software systems that are scalable,
            secure, and engineered for long-term technical excellence.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {expertise.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group relative p-8 rounded-[2.5rem] glass border border-gray-100 dark:border-white/5 hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="text-2xl font-bold mb-3 dark:text-white group-hover:text-emerald-500 transition-colors">
                  {item.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.description}
                </p>
                
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Recruiter Hook */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-24"
        >
          <div className="inline-block glass px-8 py-4 rounded-3xl border border-emerald-500/20 shadow-xl">
            <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
              🚀 Open to <span className="text-emerald-500">Software Engineering</span> opportunities!
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ServicesSection;
