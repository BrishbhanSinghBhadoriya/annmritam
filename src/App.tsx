import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { PRODUCTS } from './data/products';
import { Product, PlacedOrder } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturedProductSection } from './components/FeaturedProductSection';
import { CategoryShowcase } from './components/CategoryShowcase';
import { ProductCatalog } from './components/ProductCatalog';
import { WhyChooseUs } from './components/WhyChooseUs';
import { CultivationStory } from './components/CultivationStory';
import { PackagingQuality } from './components/PackagingQuality';
import { SuperfoodEducation } from './components/SuperfoodEducation';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { SearchModal } from './components/SearchModal';
import { AboutUsModal } from './components/AboutUsModal';
import { PolicyModal, PolicyType } from './components/PolicyModal';
import { Heart, ShoppingBag, ArrowRight, Package } from 'lucide-react';

function MainStore() {
  const [currentView, setCurrentView] = useState<'home' | 'catalog' | 'story' | 'about' | 'wishlist' | 'orders'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<PlacedOrder | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState<PolicyType | null>(null);

  const { wishlist, addToCart, orders, cartCount } = useCart();

  // Flagship product: Annmritam Premium Jumbo Makhana
  const flagshipMakhana = PRODUCTS[0];

  const handleNavigate = (view: string, categoryId?: string) => {
    if (view === 'about') {
      setIsAboutOpen(true);
      return;
    }
    setCurrentView(view as any);
    if (categoryId) {
      setSelectedCategory(categoryId);
      // scroll to catalog
      setTimeout(() => {
        const el = document.getElementById('catalog-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDirectCheckout = (product: Product, packIndex: number) => {
    addToCart(product, packIndex, 1);
    setIsCheckoutOpen(true);
  };

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#F1E2C5] text-[#1E3320]">
      
      {/* Universal Top Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigate={handleNavigate}
        currentView={currentView}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            {/* 1. Hero Section */}
            <Hero
              onShopMakhana={() => handleNavigate('catalog', 'makhana')}
              onExploreStory={() => {
                const el = document.getElementById('sourcing-story');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 2. Featured Product: Annmritam Makhana */}
            <FeaturedProductSection
              product={flagshipMakhana}
              onQuickView={(p) => setQuickViewProduct(p)}
              onDirectCheckout={handleDirectCheckout}
            />

            {/* 3. Superfood Categories Strip */}
            <CategoryShowcase
              activeCategory={selectedCategory}
              onSelectCategory={(catId) => {
                setSelectedCategory(catId);
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 4. Complete Product Catalog */}
            <ProductCatalog
              products={PRODUCTS}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onQuickView={(p) => setQuickViewProduct(p)}
            />

            {/* 5. Why Choose Annmritam */}
            <WhyChooseUs />

            {/* 6. Makhana Cultivation and Sourcing Story */}
            <CultivationStory />

            {/* 7. Product Quality and Packaging Science */}
            <PackagingQuality />

            {/* 8. Superfood Education Guide */}
            <SuperfoodEducation />

            {/* 9. Authentic Customer Testimonials */}
            <Testimonials />

            {/* 10. Frequently Asked Questions */}
            <FAQ />

            {/* 11. Newsletter Subscription */}
            <Newsletter />
          </>
        )}

        {currentView === 'catalog' && (
          <div className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
              <div className="bg-[#254A2A] text-white p-8 rounded-2xl border border-[#1D3B20] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#A94B2B] font-bold block mb-0.5">
                    Original and Earthly
                  </span>
                  <h1 className="font-serif text-3xl sm:text-4xl font-bold mt-1 text-white">
                    Annmritam Superfoods Collection
                  </h1>
                  <p className="text-sm text-white/80 max-w-xl mt-1">
                    Authentic GI-tagged Mithila Makhana, cold-roasted snack varieties, and nutrient-dense raw seeds.
                  </p>
                </div>
                <button
                  onClick={() => handleNavigate('home')}
                  className="text-xs font-semibold text-[#A94B2B] hover:underline cursor-pointer"
                >
                  &larr; Return to Homepage
                </button>
              </div>
            </div>

            <CategoryShowcase
              activeCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            <ProductCatalog
              products={PRODUCTS}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          </div>
        )}

        {currentView === 'story' && (
          <div>
            <div className="bg-[#254A2A] text-white py-12 px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#A94B2B] font-bold mb-1">
                Original and Earthly
              </p>
              <span className="text-xs uppercase tracking-widest text-[#A94B2B] font-bold">
                Origin &amp; Heritage
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-2 text-white">
                Annmritam Makhana — Mithila Wetland Harvesting
              </h1>
              <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto mt-2 font-light">
                Discover the traditional agricultural legacy of Annmritam, championed by Original and Earthly.
              </p>
            </div>
            <CultivationStory />
            <PackagingQuality />
            <WhyChooseUs />
          </div>
        )}

        {currentView === 'wishlist' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="font-serif text-3xl font-bold text-[#254A2A]">
                  Your Saved Superfoods ({wishlistedProducts.length})
                </h1>
                <p className="text-xs text-[#5A7260] mt-1">
                  Keep track of your favorite Annmritam fox nuts and seeds.
                </p>
              </div>
              <button
                onClick={() => handleNavigate('catalog')}
                className="text-xs font-bold text-[#A94B2B] hover:text-[#254A2A] cursor-pointer"
              >
                Browse All Products &rarr;
              </button>
            </div>

            {wishlistedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistedProducts.map((p) => (
                  <div key={p.id} className="bg-white rounded-xl border border-[#C8B48A] p-4 flex flex-col justify-between">
                    <div>
                      <img
                        src={p.image}
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        className="w-full aspect-[4/3] object-cover rounded-lg mb-3"
                      />
                      <span className="text-[10px] uppercase font-bold text-[#A94B2B]">{p.brand}</span>
                      <h3 className="font-serif text-sm font-bold text-[#254A2A] line-clamp-1">{p.name}</h3>
                      <p className="text-xs text-[#5A7260] line-clamp-1">{p.subtitle}</p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-[#C8B48A] flex items-center justify-between">
                      <span className="font-serif font-bold text-sm text-[#254A2A]">
                        ₹{p.packSizes[0].price}
                      </span>
                      <button
                        onClick={() => addToCart(p, p.defaultPackIndex, 1)}
                        className="bg-[#A94B2B] hover:bg-[#A94B2B] text-[#254A2A] px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-[#C8B48A] p-8 max-w-md mx-auto space-y-3">
                <Heart className="w-12 h-12 text-[#5A7260] mx-auto" />
                <h3 className="font-serif text-lg font-bold text-[#254A2A]">Your wishlist is empty</h3>
                <p className="text-xs text-[#5A7260]">
                  Click the heart icon on any superfood to save it for later.
                </p>
                <button
                  onClick={() => handleNavigate('catalog')}
                  className="bg-[#254A2A] text-[#A94B2B] px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Explore Annmritam Makhana
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Universal Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPolicy={(policy) => setActivePolicy(policy)}
      />

      {/* Slide-Over Cart Drawer */}
      <CartDrawer
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onExploreProducts={() => handleNavigate('catalog')}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onDirectCheckout={handleDirectCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={(order) => setConfirmedOrder(order)}
      />

      {/* Order Confirmation Modal */}
      <OrderConfirmationModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
        onContinueShopping={() => {
          setConfirmedOrder(null);
          handleNavigate('home');
        }}
      />

      {/* Live Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      {/* About Us Modal */}
      <AboutUsModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      {/* Policy Modal */}
      <PolicyModal
        policyType={activePolicy}
        onClose={() => setActivePolicy(null)}
      />

    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainStore />
    </CartProvider>
  );
}

