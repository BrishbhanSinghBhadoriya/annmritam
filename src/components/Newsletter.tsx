import React, { useState } from 'react';
import { Mail, CheckCircle2, Copy } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('DESI15');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 bg-[#1D3B20] text-white mithila-border mithila-border-bottom relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="w-12 h-12 rounded-full bg-[#254A2A] border border-[#A94B2B]/30 flex items-center justify-center mx-auto mb-4 text-[#A94B2B]">
          <Mail className="w-5 h-5" />
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
          Join the Annmritam Desi Superfoods Circle
        </h2>
        
        <p className="text-xs sm:text-sm text-white/80 max-w-xl mx-auto mb-8 font-light leading-relaxed">
          Receive seasonal harvest updates, traditional Ayurvedic recipes, and special member pricing from Original and Earthly.
        </p>

        {!subscribed ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 text-xs sm:text-sm bg-[#254A2A] border border-[#A94B2B]/40 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-[#A94B2B]"
            />
            <button
              type="submit"
              className="bg-[#A94B2B] hover:bg-[#A94B2B] text-[#254A2A] font-bold text-xs sm:text-sm px-6 py-3 rounded-lg transition-colors cursor-pointer shrink-0"
            >
              Get 15% Off
            </button>
          </form>
        ) : (
          <div className="bg-[#254A2A] border border-[#A94B2B]/40 p-5 rounded-xl max-w-md mx-auto animate-in fade-in duration-300">
            <div className="flex items-center justify-center gap-2 text-emerald-400 text-sm font-semibold mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Welcome to the Family!</span>
            </div>
            <p className="text-xs text-white/80 mb-3">
              Use your exclusive discount code at checkout:
            </p>
            <div className="flex items-center justify-center gap-2 bg-[#1D3B20] py-2 px-3 rounded border border-dashed border-[#A94B2B]">
              <span className="font-mono font-bold text-sm text-[#E8D6B8]">DESI15</span>
              <button
                onClick={handleCopyCode}
                className="text-[11px] bg-[#A94B2B] text-[#254A2A] px-2 py-0.5 rounded font-bold hover:bg-[#A94B2B] transition-colors cursor-pointer flex items-center gap-1"
              >
                <Copy className="w-3 h-3" />
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>
        )}

        <p className="text-[10px] text-white/50 mt-4">
          No spam, ever. Unsubscribe at any time with one click.
        </p>

      </div>
    </section>
  );
};

