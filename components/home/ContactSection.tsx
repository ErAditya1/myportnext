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
import { HiPaperAirplane, HiSparkles } from "react-icons/hi";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: 'Portfolio Contact Form Submission',
          message: formData.message || `Phone: ${formData.phone}`,
        }),
      });

      if (res.ok) {
        alert('Message sent successfully!');
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      
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
            Get In Touch
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold mb-6"
          >
            Let&apos;s Build <span className="text-gradient">Something</span> Great
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl text-gray-600 dark:text-gray-400 text-lg"
          >
            Have a project in mind or just want to say hi? Feel free to reach out. 
            I typically respond within 24 hours.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* LEFT — INFO */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass p-10 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl">
              <div className="flex items-center gap-6 mb-10">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
                  <Image
                    src="https://res.cloudinary.com/durgeshkumar/image/upload/f_auto,q_auto/v1771091150/finalsecond_t21tkd.png"
                    alt="Durgesh Kumar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold dark:text-white">Durgesh Kumar</h3>
                  <p className="text-emerald-500 font-medium">Available for Hire</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 group/item">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-white/5 flex items-center justify-center text-emerald-500 shadow-inner group-hover/item:bg-emerald-500 group-hover/item:text-white transition-all">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Location</p>
                    <p className="font-bold dark:text-gray-200">Barabanki, Uttar Pradesh, India</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group/item">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-white/5 flex items-center justify-center text-sky-500 shadow-inner group-hover/item:bg-sky-500 group-hover/item:text-white transition-all">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email</p>
                    <p className="font-bold dark:text-gray-200">dk0078774@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group/item">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-white/5 flex items-center justify-center text-indigo-500 shadow-inner group-hover/item:bg-indigo-500 group-hover/item:text-white transition-all">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Phone</p>
                    <p className="font-bold dark:text-gray-200">+91 6393381887</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-12">
                 {[
                  { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/getdurgeshkumar", color: "hover:bg-[#0A66C2]" },
                  { icon: <FaTwitter />, link: "https://twitter.com/Durgeshk6393", color: "hover:bg-[#1DA1F2]" },
                  { icon: <FaFacebook />, link: "https://www.facebook.com/profile.php?id=100036701271172", color: "hover:bg-[#1877F2]" },
                  { icon: <FaInstagram />, link: "https://instagram.com/durgesh_status_429", color: "hover:bg-[#E4405F]" },
                ].map((social, i) => (
                  <a 
                    key={i} 
                    href={social.link} 
                    target="_blank" 
                    className={`w-12 h-12 rounded-xl glass border border-gray-100 dark:border-white/5 flex items-center justify-center text-xl text-gray-500 dark:text-gray-400 hover:text-white ${social.color} transition-all duration-300 shadow-sm`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — FORM */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-10 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
            
            <h3 className="text-2xl font-bold mb-8 dark:text-white">Send a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 focus:border-emerald-500 dark:focus:border-emerald-500 focus:outline-none transition-colors dark:text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 focus:border-emerald-500 dark:focus:border-emerald-500 focus:outline-none transition-colors dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 1234567890"
                  className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 focus:border-emerald-500 dark:focus:border-emerald-500 focus:outline-none transition-colors dark:text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can I help you?"
                  rows={4}
                  className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 focus:border-emerald-500 dark:focus:border-emerald-500 focus:outline-none transition-colors dark:text-white resize-none"
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Send Message
                    <HiPaperAirplane className="rotate-90" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
