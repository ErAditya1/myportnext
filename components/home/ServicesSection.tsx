"use client";

import { motion } from "framer-motion";
import { Server, Database, Cpu, Layers, ShieldCheck, Zap } from "lucide-react";

const expertise = [
  {
    title: "Backend Engineering",
    description:
      "Designing secure, scalable backend systems using .NET and Node.js with a strong focus on clean architecture and long-term maintainability.",
    icon: Server,
  },
  {
    title: "API Architecture",
    description:
      "Building high-performance REST APIs with robust authentication, optimized queries, and production-ready error handling.",
    icon: ShieldCheck,
  },
  {
    title: "Database Optimization",
    description:
      "Improving application speed through advanced SQL tuning, indexing strategies, and efficient schema design.",
    icon: Database,
  },
  {
    title: "Full Stack Systems",
    description:
      "Delivering end-to-end applications using React, Next.js, and modern backend frameworks engineered for real-world scale.",
    icon: Layers,
  },
  {
    title: "System Design Thinking",
    description:
      "Architecting modular systems that support long-term product growth and evolving business requirements.",
    icon: Cpu,
  },
  {
    title: "Performance Engineering",
    description:
      "Reducing latency, optimizing load times, and ensuring applications remain fast under heavy traffic.",
    icon: Zap,
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
      
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">
            Engineering Expertise
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            I specialize in building production-ready software systems that are scalable,
            secure, and engineered for long-term success.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {expertise.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-white dark:bg-gray-900 shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
              >
                <Icon className="w-10 h-10 text-emerald-600 mb-4" />

                <h3 className="text-xl font-semibold mb-2">
                  {item.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Recruiter Hook */}
        <p className="text-center mt-16 text-lg font-medium">
          Open to Software Engineering opportunities where I can contribute to building scalable and impactful systems.
        </p>

      </div>
    </section>
  );
};

export default ServicesSection;
