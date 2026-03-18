"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { IoSunnyOutline } from "react-icons/io5";
import { MdOutlineDarkMode } from "react-icons/md";

const Navbar = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false); // ⭐ CRITICAL FIX
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // ✅ Prevent hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // ✅ Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !(menuRef.current as HTMLElement).contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDarkMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // ⭐ VERY IMPORTANT — wait until mounted
  if (!mounted) {
    return <div className="h-16 w-full" />; 
    // prevents layout shift
  }

  return (
    <nav className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-50 
    dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 
    shadow-md fixed w-full z-50 transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">

          {/* LOGO */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-800 dark:text-white font-palyWrite"
            >
              Durgesh Kumar
            </Link>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-6">
            {["/", "/about", "/service", "/skills", "/project", "/contact"].map(
              (path, i) => (
                <Link key={i} href={path} className="nav-link">
                  {path === "/" ? "Home" : path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)}
                </Link>
              )
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2">

            {/* DARK MODE */}
            <button
              onClick={toggleDarkMode}
              className="text-gray-800 dark:text-white p-2 rounded-md hover:scale-110 transition"
              aria-label="Toggle dark mode"
            >
              {resolvedTheme === "dark" ? (
                <IoSunnyOutline className="text-3xl" />
              ) : (
                <MdOutlineDarkMode className="text-3xl" />
              )}
            </button>

            {/* MOBILE MENU */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-800 dark:text-white p-2 rounded-md"
              aria-label="Toggle menu"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="md:hidden bg-gradient-to-r from-blue-100 via-purple-100 to-pink-50 
          dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 px-4 py-3 space-y-2"
        >
          {["/", "/about", "/service", "/skills", "/project", "/contact"].map(
            (path, i) => (
              <Link key={i} href={path} className="mobile-link block">
                {path === "/" ? "Home" : path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
