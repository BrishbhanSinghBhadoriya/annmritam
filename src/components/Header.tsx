import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onOpenSearch: () => void;
  onNavigate: (view: string, categoryId?: string) => void;
  currentView: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch, onNavigate, currentView }) => {
  const { cartCount, wishlist, setIsCartDrawerOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: string, categoryId?: string) => {
    onNavigate(view, categoryId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* 1. Announcement Bar */}
      <div className="bg-[#0B2E22] text-[#E6C568] text-xs font-medium border-b border-[#123B2A] py-2 px-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2 text-[11px] md:text-xs">
            <span className="text-[#D4AF37] font-semibold tracking-wider uppercase">Original &amp; Earthly</span>
            <span className="text-white/40">·</span>
            <span className="text-white/80">Authentic GI-Tagged Mithila Makhana &amp; Desi Superfoods</span>
          </div>
          <div className="mx-auto sm:mx-0 flex items-center gap-3 text-[11px] md:text-xs">
            <span className="flex items-center gap-1.5 text-white/90">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Use code <strong className="text-[#E6C568] font-bold">DESI15</strong> for 15% OFF</span>
            </span>
            <span className="hidden md:inline text-white/40">·</span>
            <span className="hidden md:inline text-white/70">Free Shipping above ₹499</span>
          </div>
        </div>
      </div>

      {/* 2. Primary Navigation Header adhering strictly to Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#0B2E22] text-white border-b border-[#123B2A] shadow-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single Brand Title Element */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#D4AF37] group-hover:text-[#E6C568] transition-colors">
                  Annmritam
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-white/60">
                  Desi Super Foods
                </span>
              </div>
              <p className="text-[9px] uppercase tracking-widest text-[#DDE4DA]/60">
                A Brand by Original &amp; Earthly
              </p>
            </button>
          </div>

          {/* Zone 2: 4-5 Clean Single-Line Text Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <button
              onClick={() => handleNavClick('home')}
              className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
                currentView === 'home'
                  ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'makhana')}
              className="whitespace-nowrap text-white/80 hover:text-[#D4AF37] transition-colors py-1 cursor-pointer"
            >
              Annmritam Makhana
            </button>
            <button
              onClick={() => handleNavClick('catalog')}
              className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
                currentView === 'catalog'
                  ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              All Superfoods
            </button>
            <button
              onClick={() => handleNavClick('story')}
              className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
                currentView === 'story'
                  ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Harvest &amp; Sourcing
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
                currentView === 'about'
                  ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              About Original &amp; Earthly
            </button>
          </nav>

          {/* Zone 3: Actions (Search, Wishlist, Cart Drawer) */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Search Trigger Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-white/80 hover:text-[#D4AF37] transition-colors rounded-full hover:bg-white/5 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              title="Search superfoods"
              aria-label="Search superfoods"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => handleNavClick('wishlist')}
              className="relative p-2 text-white/80 hover:text-[#D4AF37] transition-colors rounded-full hover:bg-white/5 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#B88A25] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex items-center gap-2 bg-[#B88A25] hover:bg-[#D4AF37] text-[#0B2E22] font-semibold text-xs sm:text-sm px-3.5 sm:px-4 py-2 rounded-md transition-all shadow-sm cursor-pointer whitespace-nowrap shrink-0"
              aria-label={`Shopping Cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              <span className="bg-[#0B2E22] text-[#E6C568] text-xs font-bold px-1.5 py-0.5 rounded-full ml-0.5">
                {cartCount}
              </span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-white rounded-md cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Slide-Down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0B2E22] border-t border-[#123B2A] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold px-2 py-1">
              Menu Navigation
            </div>
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium ${
                currentView === 'home' ? 'bg-[#123B2A] text-[#D4AF37]' : 'text-white/80 hover:bg-white/5'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'makhana')}
              className="w-full text-left px-3 py-2.5 rounded-md text-sm font-medium text-white/80 hover:bg-white/5 flex items-center justify-between"
            >
              <span>Annmritam Makhana (Fox Nuts)</span>
              <span className="text-[11px] text-[#D4AF37]">GI Mithila</span>
            </button>
            <button
              onClick={() => handleNavClick('catalog')}
              className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium ${
                currentView === 'catalog' ? 'bg-[#123B2A] text-[#D4AF37]' : 'text-white/80 hover:bg-white/5'
              }`}
            >
              All Superfood Categories
            </button>
            <button
              onClick={() => handleNavClick('story')}
              className="w-full text-left px-3 py-2.5 rounded-md text-sm font-medium text-white/80 hover:bg-white/5"
            >
              Cultivation &amp; Sourcing Story
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="w-full text-left px-3 py-2.5 rounded-md text-sm font-medium text-white/80 hover:bg-white/5"
            >
              About Original &amp; Earthly
            </button>

            <div className="pt-3 border-t border-[#123B2A] flex items-center justify-between text-xs text-white/60 px-2">
              <span>Customer Care: +91 98765 43210</span>
              <span className="text-[#D4AF37]">FSSAI Certified</span>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
