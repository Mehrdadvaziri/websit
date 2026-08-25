import React, { useState } from 'react';
import { 
  NavigationTab, 
  Product, 
  Order, 
  Project, 
  NewsArticle, 
  CartItem, 
  UserProfile 
} from './types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_ORDERS, 
  INITIAL_PROJECTS, 
  INITIAL_NEWS, 
  CURRENT_USER 
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { HeroSection } from './components/HeroSection';
import { BentoShowcase } from './components/BentoShowcase';
import { ServicesSection } from './components/ServicesSection';
import { ProductsCatalog } from './components/ProductsCatalog';
import { ProductDetailView } from './components/ProductDetailView';
import { ProjectsSection } from './components/ProjectsSection';
import { NewsSection } from './components/NewsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { AIAssistantModal } from './components/AIAssistantModal';
import { UserPortal } from './components/UserPortal';
import { AdminDashboard } from './components/AdminDashboard';
import { ElementorWooCommerceModal } from './components/ElementorWooCommerceModal';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';

export function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [projects] = useState<Project[]>(INITIAL_PROJECTS);
  const [news] = useState<NewsArticle[]>(INITIAL_NEWS);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(CURRENT_USER);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isElementorModalOpen, setIsElementorModalOpen] = useState(false);

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleAddMultipleToCart = (items: { product: Product; quantity: number }[]) => {
    setCartItems(prev => {
      let updated = [...prev];
      items.forEach(({ product, quantity }) => {
        const index = updated.findIndex(i => i.product.id === product.id);
        if (index > -1) {
          updated[index] = { ...updated[index], quantity: updated[index].quantity + quantity };
        } else {
          updated.push({ product, quantity });
        }
      });
      return updated;
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handlePlaceOrder = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentTab('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9fb] text-slate-900 font-sans antialiased selection:bg-[#0066FF]/20 selection:text-[#0066FF]">
      
      {/* Top Sticky Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartItems={cartItems}
        setIsCartOpen={setIsCartOpen}
        setIsAiModalOpen={setIsAiModalOpen}
        setIsAuthModalOpen={setIsAuthModalOpen}
        setIsElementorModalOpen={setIsElementorModalOpen}
        currentUser={currentUser}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Router */}
      <main className="flex-grow">
        {currentTab === 'home' && (
          <>
            <HeroSlider
              setCurrentTab={setCurrentTab}
              setIsAiModalOpen={setIsAiModalOpen}
              setIsCartOpen={setIsCartOpen}
            />
            <BentoShowcase
              setCurrentTab={setCurrentTab}
              setSelectedCategory={setSelectedCategory}
            />
            <ServicesSection
              setCurrentTab={setCurrentTab}
              setIsAiModalOpen={setIsAiModalOpen}
            />
            <ProductsCatalog
              products={products.slice(0, 4)}
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              cartItems={cartItems}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setIsAiModalOpen={setIsAiModalOpen}
            />
            <ProjectsSection
              projects={projects}
              setCurrentTab={setCurrentTab}
              setIsAiModalOpen={setIsAiModalOpen}
            />
            <NewsSection
              articles={news}
              setCurrentTab={setCurrentTab}
            />
          </>
        )}

        {currentTab === 'products' && (
          <ProductsCatalog
            products={products}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            cartItems={cartItems}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setIsAiModalOpen={setIsAiModalOpen}
          />
        )}

        {currentTab === 'product-detail' && (
          <ProductDetailView
            product={selectedProduct || products[0]}
            allProducts={products}
            onBack={() => setCurrentTab('products')}
            onAddToCart={handleAddToCart}
            onSelectRelated={handleSelectProduct}
            setIsAiModalOpen={setIsAiModalOpen}
            setIsCartOpen={setIsCartOpen}
          />
        )}

        {currentTab === 'projects' && (
          <ProjectsSection
            projects={projects}
            setCurrentTab={setCurrentTab}
            setIsAiModalOpen={setIsAiModalOpen}
          />
        )}

        {currentTab === 'news' && (
          <NewsSection
            articles={news}
            setCurrentTab={setCurrentTab}
          />
        )}

        {currentTab === 'about' && (
          <AboutSection
            setCurrentTab={setCurrentTab}
            setIsAiModalOpen={setIsAiModalOpen}
          />
        )}

        {currentTab === 'contact' && (
          <ContactSection
            setIsAiModalOpen={setIsAiModalOpen}
          />
        )}

        {currentTab === 'user-portal' && currentUser && (
          <UserPortal
            currentUser={currentUser}
            orders={orders}
            setCurrentTab={setCurrentTab}
            setIsCartOpen={setIsCartOpen}
          />
        )}

        {currentTab === 'admin-dashboard' && (
          <AdminDashboard
            products={products}
            setProducts={setProducts}
            orders={orders}
            setOrders={setOrders}
            setCurrentTab={setCurrentTab}
            setIsElementorModalOpen={setIsElementorModalOpen}
          />
        )}
      </main>

      {/* Footer */}
      {currentTab !== 'admin-dashboard' && (
        <Footer
          setCurrentTab={setCurrentTab}
          setIsAiModalOpen={setIsAiModalOpen}
          setIsElementorModalOpen={setIsElementorModalOpen}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onPlaceOrder={handlePlaceOrder}
        setCurrentTab={setCurrentTab}
      />

      {/* AI Assistant Modal (BOM Generator & Technical Chat) */}
      <AIAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        products={products}
        onAddMultipleToCart={handleAddMultipleToCart}
        setIsCartOpen={setIsCartOpen}
      />

      {/* Elementor & WooCommerce Exporter / Importer Modal */}
      <ElementorWooCommerceModal
        isOpen={isElementorModalOpen}
        onClose={() => setIsElementorModalOpen(false)}
        products={products}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        setCurrentUser={setCurrentUser}
        onSuccessLogin={() => setCurrentTab('user-portal')}
      />

    </div>
  );
}
export default App;
