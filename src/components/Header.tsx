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
      <div className="bg-[#F1E2C5] text-[#1E3320] text-xs font-medium py-2 px-4 transition-all mithila-border-bottom">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2 text-[11px] md:text-xs">
            <span className="text-[#A94B2B] font-semibold tracking-wider uppercase">Original and Earthly</span>
            <span className="text-[#5A7260]">·</span>
            <span className="text-[#1E3320]/80">Presents <strong className="text-[#A94B2B]">Annmritam</strong> — Authentic GI-Tagged Mithila Makhana</span>
          </div>
          <div className="mx-auto sm:mx-0 flex items-center gap-3 text-[11px] md:text-xs">
            <span className="flex items-center gap-1.5 text-[#1E3320]/90">
              <Sparkles className="w-3.5 h-3.5 text-[#A94B2B]" />
              <span>Use code <strong className="text-[#A94B2B] font-bold">DESI15</strong> for 15% OFF</span>
            </span>
            <span className="hidden md:inline text-[#5A7260]">·</span>
            <span className="hidden md:inline text-[#1E3320]/70">Free Shipping above ₹499</span>
          </div>
        </div>
      </div>

      {/* 2. Primary Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#F1E2C5] text-[#1E3320] border-b border-[#C8B48A] shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          
          {/* Zone 1: Brand Identity — Company + Product */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A94B2B]"
            >
              {/* Company name on top */}
              
              {/* Product brand large */}
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#A94B2B] group-hover:text-[#8B3A22] transition-colors">
                  Original and Earthly
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-[#254A2A]/70">
                  Desi Super Foods
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <button
              onClick={() => handleNavClick('home')}
              className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
                currentView === 'home'
                  ? 'text-[#A94B2B] border-b-2 border-[#A94B2B]'
                  : 'text-[#254A2A] hover:text-[#A94B2B]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'makhana')}
              className="whitespace-nowrap text-[#254A2A] hover:text-[#A94B2B] transition-colors py-1 cursor-pointer"
            >
              Annmritam Makhana
            </button>
            <button
              onClick={() => handleNavClick('catalog')}
              className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
                currentView === 'catalog'
                  ? 'text-[#A94B2B] border-b-2 border-[#A94B2B]'
                  : 'text-[#254A2A] hover:text-[#A94B2B]'
              }`}
            >
              All Superfoods
            </button>
            <button
              onClick={() => handleNavClick('story')}
              className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
                currentView === 'story'
                  ? 'text-[#A94B2B] border-b-2 border-[#A94B2B]'
                  : 'text-[#254A2A] hover:text-[#A94B2B]'
              }`}
            >
              Harvest &amp; Sourcing
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
                currentView === 'about'
                  ? 'text-[#A94B2B] border-b-2 border-[#A94B2B]'
                  : 'text-[#254A2A] hover:text-[#A94B2B]'
              }`}
            >
              About Us
            </button>
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#254A2A] hover:text-[#A94B2B] transition-colors rounded-full hover:bg-[#E8D6B8] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#A94B2B]"
              title="Search superfoods"
              aria-label="Search superfoods"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => handleNavClick('wishlist')}
              className="relative p-2 text-[#254A2A] hover:text-[#A94B2B] transition-colors rounded-full hover:bg-[#E8D6B8] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#A94B2B]"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#A94B2B] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex items-center gap-2 bg-[#254A2A] hover:bg-[#1D3B20] text-[#F1E2C5] font-semibold text-xs sm:text-sm px-3.5 sm:px-4 py-2 rounded-md transition-all shadow-sm cursor-pointer whitespace-nowrap shrink-0"
              aria-label={`Shopping Cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              <span className="bg-[#A94B2B] text-white text-xs font-bold px-1.5 py-0.5 rounded-full ml-0.5">
                {cartCount}
              </span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#254A2A] hover:text-[#A94B2B] rounded-md cursor-pointer focus-visible:ring-2 focus-visible:ring-[#A94B2B]"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Slide-Down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#F1E2C5] border-t border-[#C8B48A] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="text-xs uppercase tracking-wider font-semibold px-2 py-1 flex items-center gap-2">
              <span className="text-[#A94B2B]">Original and Earthly</span>
              <span className="text-[#5A7260]">·</span>
              <span className="text-[#254A2A]">Annmritam</span>
            </div>
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium ${
                currentView === 'home' ? 'bg-[#E8D6B8] text-[#A94B2B]' : 'text-[#254A2A] hover:bg-[#E8D6B8]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'makhana')}
              className="w-full text-left px-3 py-2.5 rounded-md text-sm font-medium text-[#254A2A] hover:bg-[#E8D6B8] flex items-center justify-between"
            >
              <span>Annmritam Makhana (Fox Nuts)</span>
              <span className="text-[11px] text-[#A94B2B]">GI Mithila</span>
            </button>
            <button
              onClick={() => handleNavClick('catalog')}
              className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium ${
                currentView === 'catalog' ? 'bg-[#E8D6B8] text-[#A94B2B]' : 'text-[#254A2A] hover:bg-[#E8D6B8]'
              }`}
            >
              All Superfood Categories
            </button>
            <button
              onClick={() => handleNavClick('story')}
              className="w-full text-left px-3 py-2.5 rounded-md text-sm font-medium text-[#254A2A] hover:bg-[#E8D6B8]"
            >
              Cultivation &amp; Sourcing Story
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="w-full text-left px-3 py-2.5 rounded-md text-sm font-medium text-[#254A2A] hover:bg-[#E8D6B8]"
            >
              About Original and Earthly
            </button>
            <div className="pt-3 border-t border-[#C8B48A] flex items-center justify-between text-xs text-[#5A7260] px-2">
              <span>Customer Care: +91 98765 43210</span>
              <span className="text-[#A94B2B]">FSSAI Certified</span>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

