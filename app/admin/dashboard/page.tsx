import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import Blog from '@/models/Blog';
import Contact from '@/models/Contact';
import Visitor from '@/models/Visitor';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  await dbConnect();
  
  const [projectCount, blogCount, _messageCount, unreadMessages, visitorStats] = await Promise.all([
    Project.countDocuments(),
    Blog.countDocuments(),
    Contact.countDocuments(),
    Contact.countDocuments({ isRead: false }),
    Visitor.aggregate([
      {
        $group: {
          _id: null,
          totalVisits: { $sum: 1 },
          uniqueVisitors: { $addToSet: "$ip" },
        },
      },
      {
        $project: {
          totalVisits: 1,
          uniqueCount: { $size: "$uniqueVisitors" },
        },
      },
    ]),
  ]);

  const stats = [
    { name: 'Total Visits', value: visitorStats[0]?.totalVisits || 0, color: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },
    { name: 'Unique Visitors', value: visitorStats[0]?.uniqueCount || 0, color: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20' },
    { name: 'Total Projects', value: projectCount, color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
    { name: 'Total Blogs', value: blogCount, color: 'bg-green-500/10 text-green-500 border-green-500/20' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <div key={stat.name} className={`p-6 rounded-2xl border ${stat.color} flex flex-col justify-between`}>
            <h3 className="font-medium opacity-80 mb-2">{stat.name}</h3>
            <span className="text-4xl font-bold">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="/admin/projects" className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700 hover:bg-zinc-700 transition font-medium">
              Manage Projects
            </a>
            <a href="/admin/blogs" className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700 hover:bg-zinc-700 transition font-medium">
              Manage Blogs
            </a>
            <a href="/admin/messages" className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700 hover:bg-zinc-700 transition font-medium flex justify-between items-center">
              Messages
              {unreadMessages > 0 && <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">{unreadMessages} new</span>}
            </a>
            <a href="/" target="_blank" className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition font-medium">
              View Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
