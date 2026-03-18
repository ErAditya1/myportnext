"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HiDownload, HiUserAdd } from "react-icons/hi";

const RecruiterCTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-emerald-600 dark:bg-emerald-600/90 rounded-[3rem] p-12 md:p-16 overflow-hidden shadow-2xl shadow-emerald-500/20"
        >
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="text-center lg:text-left max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                Available for New <br />
                <span className="text-emerald-200">Engineering Roles</span>
              </h2>
              <p className="text-emerald-50/80 text-lg md:text-xl font-medium leading-relaxed">
                Focused on building scalable products with clean architecture, 
                high performance, and measurable business impact.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 px-8 py-5 rounded-2xl bg-white text-emerald-600 font-bold text-lg shadow-xl hover:shadow-2xl transition-all w-full sm:w-auto"
                >
                  <HiUserAdd className="text-xl" />
                  Hire Me Now
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <a
                  href="/resumedk.pdf"
                  className="flex items-center justify-center gap-2 px-8 py-5 rounded-2xl bg-emerald-500 text-white border border-emerald-400 font-bold text-lg shadow-xl hover:shadow-2xl transition-all w-full sm:w-auto"
                >
                  <HiDownload className="text-xl" />
                  Get Resume
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RecruiterCTA;
