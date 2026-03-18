'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FolderKanban, FileText, MessageSquare, LogOut, Globe } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // If on login page, don't show the sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
    { name: 'Blogs', href: '/admin/blogs', icon: FileText },
    { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-950 flex flex-col fixed h-full inset-y-0 z-50">
        <div className="p-6">
          <Link href="/admin/dashboard" className="text-xl font-bold flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">A</span>
            Admin Panel
          </Link>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors w-full"
          >
            <Globe size={18} />
            View Live Site
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors w-full text-left"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen bg-zinc-950">
        {children}
      </main>
    </div>
  );
}
