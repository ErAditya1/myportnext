'use client';

import { useState, useEffect } from 'react';
import { Mail, Calendar } from 'lucide-react';

export default function MessagesAdmin() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Contact Messages</h1>

      {loading ? (
        <div className="text-zinc-400 text-center py-12">Loading messages...</div>
      ) : messages.length === 0 ? (
        <div className="text-center py-12 border border-zinc-800 border-dashed rounded-xl bg-zinc-900/50">
          <Mail className="mx-auto h-12 w-12 text-zinc-600 mb-4" />
          <h3 className="text-xl font-medium text-zinc-300">No messages yet</h3>
          <p className="text-zinc-500 mt-2">When visitors use your contact form, messages will appear here.</p>
        </div>
      ) : (
        <div className="grid gap-6 max-w-4xl">
          {messages.map((msg: { _id: string; isRead: boolean; subject: string; name: string; email: string; createdAt: string; message: string }) => (
            <div key={msg._id} className={`p-6 rounded-xl border ${msg.isRead ? 'bg-zinc-900 border-zinc-800' : 'bg-[#18181b] border-blue-500/30'}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold flex items-center gap-3">
                    {msg.subject}
                    {!msg.isRead && <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">New</span>}
                  </h3>
                  <div className="text-sm text-zinc-400 mt-1 flex items-center gap-2">
                    <span className="font-medium text-zinc-300">{msg.name}</span> 
                    &bull; <a href={`mailto:${msg.email}`} className="hover:text-white underline decoration-zinc-700 underline-offset-2">{msg.email}</a>
                  </div>
                </div>
                <div className="text-xs text-zinc-500 flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(msg.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="p-4 bg-zinc-950/50 rounded-lg text-zinc-300 whitespace-pre-wrap leading-relaxed">
                {msg.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
