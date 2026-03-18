"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { IoSunnyOutline, IoCloseOutline, IoMenuOutline } from "react-icons/io5";
import { MdOutlineDarkMode } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const menuRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Calculate scroll progress
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !(menuRef.current as HTMLElement).contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  if (!mounted) return <div className="h-20 w-full" />;

  const toggleDarkMode = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/service" },
    { name: "Skills", path: "/skills" },
    { name: "Projects", path: "/project" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav 
      className={`fixed w-full z-[100] transition-all duration-500 ${
        scrolled ? "py-3 glass shadow-lg" : "py-5 bg-transparent"
      }`}
    >
      {/* Scroll Progress Bar */}
      <div 
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-emerald-500 to-sky-500 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-14">
          {/* LOGO */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-sky-600 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white hidden sm:block">
              Durgesh <span className="text-emerald-500">Kumar</span>
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path} className="nav-link">
                {link.name}
              </Link>
            ))}
            
            {/* THEME TOGGLE */}
            <button
              onClick={toggleDarkMode}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white hover:ring-2 ring-emerald-500 transition-all duration-300"
              aria-label="Toggle dark mode"
            >
              {resolvedTheme === "dark" ? (
                <IoSunnyOutline className="text-xl" />
              ) : (
                <MdOutlineDarkMode className="text-xl" />
              )}
            </button>
          </div>

          {/* MOBILE TOGGLE */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="text-gray-800 dark:text-white p-2"
            >
              {resolvedTheme === "dark" ? <IoSunnyOutline className="text-2xl" /> : <MdOutlineDarkMode className="text-2xl" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-900 dark:text-white focus:outline-none"
            >
              {isMenuOpen ? <IoCloseOutline className="text-3xl" /> : <IoMenuOutline className="text-3xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="mobile-link text-lg font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
