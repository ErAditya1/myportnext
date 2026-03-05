"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

import profileImg from "@/assets/images/p1.jpg";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <section className="min-h-screen py-24 md:py-20 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 text-gray-800 dark:text-white transition-all duration-500">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold font-palyWrite">Contact Us</h1>
        <p className="mt-3 text-gray-600 dark:text-gray-300">
          Let&apos;s build something useful together.
        </p>
        <hr className="border-0 h-1 mt-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse w-1/2 md:w-1/3 mx-auto" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4"
      >
        <div className="rounded-2xl border border-white/40 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm p-6 shadow-xl">
          <div className="flex flex-col items-center text-center">
            <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-emerald-200 dark:border-emerald-800 shadow-lg">
              <Image
                src={profileImg}
                alt="Durgesh Kumar"
                fill
                sizes="128px"
                className="object-cover"
              />
            </div>

            <h2 className="text-2xl font-bold mt-4 text-emerald-600 dark:text-emerald-400">
              Durgesh Kumar
            </h2>

            <div className="mt-5 w-full space-y-3 text-left">
              <div className="flex items-center gap-3 rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-3">
                <FaMapMarkerAlt className="text-emerald-600 dark:text-emerald-400" />
                <span>Barabanki, Uttar Pradesh</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-3">
                <FaEnvelope className="text-emerald-600 dark:text-emerald-400" />
                <span>dk0078774@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-3">
                <FaPhoneAlt className="text-emerald-600 dark:text-emerald-400" />
                <span>6393381887</span>
              </div>
            </div>
          </div>

          <motion.div
            className="flex justify-center gap-4 mt-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <SocialIcon
              href="https://www.facebook.com/profile.php?id=100036701271172"
              color="#1877F2"
              icon={<FaFacebook />}
            />
            <SocialIcon
              href="https://twitter.com/Durgeshk6393"
              color="#1DA1F2"
              icon={<FaTwitter />}
            />
            <SocialIcon
              href="https://www.linkedin.com/in/getdurgeshkumar"
              color="#0A66C2"
              icon={<FaLinkedin />}
            />
            <SocialIcon
              href="https://instagram.com/durgesh_status_429"
              color="#E4405F"
              icon={<FaInstagram />}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="p-6 rounded-2xl shadow-xl bg-white/90 dark:bg-gray-900/90 border border-white/40 dark:border-gray-700"
        >
          <h2 className="text-xl font-bold mb-1">Send a Message</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            I usually reply within 24 hours.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="p-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
            <input
              type="email"
              name="email"
              suppressHydrationWarning
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="p-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your Phone Number"
              className="p-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="p-3 border rounded-lg h-32 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
};

const SocialIcon = ({ href, icon, color }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.2, rotate: 10, color }}
    className="text-2xl text-gray-600 dark:text-white p-2 rounded-full bg-gray-100 dark:bg-gray-800"
  >
    {icon}
  </motion.a>
);

export default ContactSection;
