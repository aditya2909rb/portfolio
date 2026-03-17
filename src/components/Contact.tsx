import React from 'react';
import { motion } from 'motion/react';
import { Mail, MessageSquare, Send, MapPin } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '918eb31d-35a8-4b1c-aaec-f84dfa430c53',
          ...formData
        })
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setResponseMsg('Message received! I will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error) {
      setStatus('error');
      setResponseMsg('Failed to send message. Please try again later.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Let's <span className="text-[#00d4ff]">Connect</span></h2>
              <div className="h-1 w-20 bg-[#00d4ff]" />
            </div>
            
            <p className="text-white/60 text-lg mb-12 max-w-md">
              Interested in hyperscale LLM training, AI systems, or cybersecurity? I'm always open to discussing frontier technology and high-impact opportunities.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00d4ff] group-hover:border-[#00d4ff]/50 transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-xs font-mono text-white/40 uppercase tracking-widest mb-1">Email</div>
                  <a href="mailto:adityaroybardhan@gmail.com" className="text-xl font-bold text-white hover:text-[#00d4ff] transition-colors">
                    adityaroybardhan@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400/50 transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <div className="text-xs font-mono text-white/40 uppercase tracking-widest mb-1">Location</div>
                  <div className="text-xl font-bold text-white">
                    Kolkata, India
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ 
              type: "spring",
              stiffness: 50,
              damping: 20
            }}
            className="p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl"
          >
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
                  <Send size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Transmission Successful</h3>
                <p className="text-white/60 mb-8">{responseMsg}</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all"
                >
                  SEND ANOTHER
                </button>
              </motion.div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-white/40 uppercase tracking-widest">Name</label>
                    <input 
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text" 
                      className="w-full px-6 py-4 rounded-xl bg-black/40 border border-white/10 text-white focus:border-[#00d4ff] focus:outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-white/40 uppercase tracking-widest">Email</label>
                    <input 
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email" 
                      className="w-full px-6 py-4 rounded-xl bg-black/40 border border-white/10 text-white focus:border-[#00d4ff] focus:outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-white/40 uppercase tracking-widest">Subject</label>
                  <input 
                    required
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    type="text" 
                    className="w-full px-6 py-4 rounded-xl bg-black/40 border border-white/10 text-white focus:border-[#00d4ff] focus:outline-none transition-all"
                    placeholder="Collaboration Opportunity"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-white/40 uppercase tracking-widest">Message</label>
                  <textarea 
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-6 py-4 rounded-xl bg-black/40 border border-white/10 text-white focus:border-[#00d4ff] focus:outline-none transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-400 text-sm font-mono">{responseMsg}</p>
                )}

                <motion.button
                  disabled={status === 'loading'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl bg-[#00d4ff] text-black font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>SEND MESSAGE <Send size={18} /></>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
