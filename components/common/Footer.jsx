import Link from "next/link";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-8 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 text-gray-800 dark:text-white">
      <div className="container mx-auto flex flex-col items-center">
        <h3 className="text-md font-semibold mb-2 text-emerald-600 dark:text-emerald-400">
          Connect with me:
        </h3>

        <div className="flex space-x-4 mb-4">
          <a
            href="https://www.linkedin.com/in/getdurgeshkumar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-2xl hover:text-[#0A66C2] transition" />
          </a>
          <a
            href="https://github.com/DurgeshKumar143"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-2xl hover:text-gray-600 transition" />
          </a>
          <a
            href="https://twitter.com/Durgeshk6393"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="text-2xl hover:text-[#1DA1F2] transition" />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100036701271172"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="text-2xl hover:text-[#1877F2] transition" />
          </a>
        </div>

        <h3 className="text-md font-semibold mb-2 text-emerald-600 dark:text-emerald-400">
          Quick Links:
        </h3>

        <nav className="flex space-x-4 mb-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/project" className="hover:underline">
            Projects
          </Link>
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </nav>

        <p className="mt-4 text-gray-600 dark:text-gray-300">
          (c) {new Date().getFullYear()} Durgesh Kumar. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
