export type NavigationTab = 
  | 'home' 
  | 'products' 
  | 'product-detail' 
  | 'projects' 
  | 'news' 
  | 'about' 
  | 'contact' 
  | 'user-portal' 
  | 'admin-dashboard';

export interface Product {
  id: string;
  title: string;
  category: 'fiber' | 'copper' | 'active' | 'passive' | 'rack';
  categoryLabel: string;
  sku: string;
  price: number;
  formattedPrice: string;
  inStock: boolean;
  stockCount: number;
  image: string;
  gallery: string[];
  shortDescription: string;
  fullDescription: string;
  specs: {
    label: string;
    value: string;
  }[];
  keyBenefits: {
    title: string;
    description: string;
    icon: string;
  }[];
  badge?: string;
  seoKeywords: string[];
}

export interface OrderItem {
  productId: string;
  productTitle: string;
  quantity: number;
  unitPrice: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  companyName: string;
  date: string;
  totalAmount: number;
  formattedAmount: string;
  status: 'processing' | 'approved' | 'delivered' | 'pending';
  statusLabel: string;
  items: OrderItem[];
  paymentMethod?: string;
  trackingCode?: string;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  description: string;
  fullStory?: string;
  image: string;
  iconName: string;
  stats?: string;
  isFeatured?: boolean;
}

export interface NewsArticle {
  id: string;
  title: string;
  category: 'all' | 'fiber' | 'active' | 'standards';
  categoryLabel: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
  isFeatured?: boolean;
  readTime: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface UserProfile {
  name: string;
  role: string;
  company: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface AIRecommendationItem {
  productName: string;
  category: string;
  sku: string;
  reason: string;
  quantity: string;
  estimatedBudget: string;
}

export interface AIRecommendationResponse {
  technicalSummary: string;
  recommendations: AIRecommendationItem[];
  seoTags?: string[];
  elementorWooAdvice?: string;
  source?: string;
}
