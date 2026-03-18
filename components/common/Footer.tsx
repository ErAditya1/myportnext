import Link from "next/link";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 border-t border-gray-100 dark:border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-black tracking-tighter dark:text-white mb-6 block">
              Durgesh<span className="text-emerald-500">.</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm mb-8 leading-relaxed">
              Software Engineer specializing in building exceptional digital experiences 
              that are fast, accessible, and engineered for scale.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/getdurgeshkumar", color: "hover:text-[#0A66C2]" },
                { icon: <FaGithub />, link: "https://github.com/DurgeshKumar143", color: "hover:text-gray-400" },
                { icon: <FaTwitter />, link: "https://twitter.com/Durgeshk6393", color: "hover:text-[#1DA1F2]" },
                { icon: <FaFacebook />, link: "https://www.facebook.com/profile.php?id=100036701271172", color: "hover:text-[#1877F2]" },
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.link} 
                  target="_blank" 
                  className={`text-xl text-gray-500 transition-colors ${social.color}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest dark:text-white mb-6">Sitemap</h4>
            <nav className="flex flex-col gap-4">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Projects", href: "/project" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <Link 
                  key={link.label} 
                  href={link.href} 
                  className="text-gray-600 dark:text-gray-400 hover:text-emerald-500 transition-colors inline-block"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info Shorthand */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest dark:text-white mb-6">Contact</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-2">Barabanki, UP, India</p>
            <a href="mailto:dk0078774@gmail.com" className="text-gray-600 dark:text-gray-400 hover:text-emerald-500 transition-colors block mb-2">
              dk0078774@gmail.com
            </a>
            <p className="text-gray-600 dark:text-gray-400">+91 6393381887</p>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-widest">
          <p>© {currentYear} Durgesh Kumar. Engineered with Passion.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-emerald-500 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-emerald-500 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
