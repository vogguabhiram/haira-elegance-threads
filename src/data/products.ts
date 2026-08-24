import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import p7 from "@/assets/p7.jpg";
import p8 from "@/assets/p8.jpg";

export type CategorySlug = "sarees" | "dresses" | "kurtis" | "ethnic-wear";

/**
 * Single source of truth for catalogue data.
 * Shape mirrors a future `products` table so it can be swapped for a
 * database read without touching any UI component.
 */
export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  description: string;
  price: number;
  mrp: number;
  images: string[];
  colors: string[];
  sizes: string[];
  stock: number;
  sku: string;
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  rating: number;
  reviewCount: number;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  image: string;
}

export const categories: Category[] = [
  {
    slug: "sarees",
    name: "Sarees",
    description: "Traditional elegance for every occasion.",
    image: p1,
  },
  {
    slug: "dresses",
    name: "Dresses",
    description: "Modern styles with an Indian touch.",
    image: p5,
  },
  {
    slug: "kurtis",
    name: "Kurtis",
    description: "Elegant everyday and festive wear.",
    image: p6,
  },
  {
    slug: "ethnic-wear",
    name: "Ethnic Wear",
    description: "Curated styles for celebrations and special occasions.",
    image: p7,
  },
];

export const products: Product[] = [
  {
    id: "HC-001",
    slug: "royal-banarasi-saree",
    name: "Royal Banarasi Saree",
    category: "sarees",
    description:
      "A handwoven Banarasi silk saree in deep royal red, detailed with intricate gold zari motifs across the body and a richly patterned pallu. Comes with an unstitched matching blouse piece.",
    price: 899,
    mrp: 1299,
    images: [p1, p3, p2],
    colors: ["Royal Red", "Wine", "Gold"],
    sizes: ["Free Size"],
    stock: 12,
    sku: "HC-SAR-001",
    featured: true,
    bestSeller: true,
    newArrival: false,
    rating: 4.8,
    reviewCount: 126,
  },
  {
    id: "HC-002",
    slug: "floral-designer-saree",
    name: "Floral Designer Saree",
    category: "sarees",
    description:
      "A soft blush georgette saree with delicate floral prints and a fine gold-tipped border. Light, fluid and perfect for daytime celebrations.",
    price: 649,
    mrp: 899,
    images: [p2, p4, p1],
    colors: ["Blush Pink", "Ivory"],
    sizes: ["Free Size"],
    stock: 20,
    sku: "HC-SAR-002",
    featured: true,
    bestSeller: false,
    newArrival: true,
    rating: 4.6,
    reviewCount: 84,
  },
  {
    id: "HC-003",
    slug: "festive-silk-saree",
    name: "Festive Silk Saree",
    category: "sarees",
    description:
      "Lustrous wine silk with a broad gold zari border, tailored for festive evenings and family functions. Drapes beautifully and holds its pleats.",
    price: 799,
    mrp: 1099,
    images: [p3, p1, p4],
    colors: ["Wine", "Maroon"],
    sizes: ["Free Size"],
    stock: 9,
    sku: "HC-SAR-003",
    featured: true,
    bestSeller: true,
    newArrival: false,
    rating: 4.9,
    reviewCount: 152,
  },
  {
    id: "HC-004",
    slug: "elegant-georgette-saree",
    name: "Elegant Georgette Saree",
    category: "sarees",
    description:
      "A pastel georgette saree with subtle thread embroidery and a scalloped lace border. Understated elegance for receptions and day weddings.",
    price: 549,
    mrp: 799,
    images: [p4, p2, p3],
    colors: ["Pastel Green", "Ivory", "Blush Pink"],
    sizes: ["Free Size"],
    stock: 16,
    sku: "HC-SAR-004",
    featured: true,
    bestSeller: false,
    newArrival: true,
    rating: 4.5,
    reviewCount: 61,
  },
  {
    id: "HC-005",
    slug: "embroidered-party-dress",
    name: "Embroidered Party Dress",
    category: "dresses",
    description:
      "A floor-length burgundy party dress with fine silver embroidery, sheer sleeves and a flared georgette skirt. A modern silhouette with ethnic detailing.",
    price: 749,
    mrp: 999,
    images: [p5, p7, p6],
    colors: ["Burgundy", "Maroon"],
    sizes: ["S", "M", "L", "XL"],
    stock: 14,
    sku: "HC-DRS-005",
    featured: true,
    bestSeller: true,
    newArrival: false,
    rating: 4.7,
    reviewCount: 97,
  },
  {
    id: "HC-006",
    slug: "designer-kurti-set",
    name: "Designer Kurti Set",
    category: "kurtis",
    description:
      "A blush pink kurti with chikankari-inspired embroidery, matched with palazzo pants and a soft dupatta. Breathable and easy to style.",
    price: 499,
    mrp: 699,
    images: [p6, p8, p2],
    colors: ["Blush Pink", "Ivory"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 25,
    sku: "HC-KUR-006",
    featured: true,
    bestSeller: true,
    newArrival: true,
    rating: 4.6,
    reviewCount: 143,
  },
  {
    id: "HC-007",
    slug: "festive-anarkali-dress",
    name: "Festive Anarkali Dress",
    category: "ethnic-wear",
    description:
      "A gold and maroon Anarkali with an embellished bodice, dense zari work along the hem and a contrast dupatta. Made for the biggest nights of the year.",
    price: 949,
    mrp: 1349,
    images: [p7, p5, p3],
    colors: ["Gold", "Maroon"],
    sizes: ["S", "M", "L", "XL"],
    stock: 7,
    sku: "HC-ETH-007",
    featured: true,
    bestSeller: false,
    newArrival: true,
    rating: 4.9,
    reviewCount: 58,
  },
  {
    id: "HC-008",
    slug: "premium-cotton-kurti",
    name: "Premium Cotton Kurti",
    category: "kurtis",
    description:
      "An ivory cotton kurti with fine block-printed motifs and contrast placket detailing, paired with matching straight pants. An everyday favourite.",
    price: 399,
    mrp: 599,
    images: [p8, p6, p4],
    colors: ["Ivory", "Beige"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 34,
    sku: "HC-KUR-008",
    featured: true,
    bestSeller: true,
    newArrival: true,
    rating: 4.4,
    reviewCount: 210,
  },
];

export const discountPercent = (product: Product) =>
  product.mrp > product.price ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;

export const formatINR = (amount: number) =>
  `₹${amount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

export const getProducts = () => products;

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);

export const getProductById = (id: string) => products.find((p) => p.id === id);

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

export const allSizes = Array.from(new Set(products.flatMap((p) => p.sizes)));
export const allColors = Array.from(new Set(products.flatMap((p) => p.colors))).sort();

export const searchProducts = (query: string, list: Product[] = products) => {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  const terms = q.split(/\s+/);
  return list.filter((p) => {
    const haystack = [p.name, p.category, p.description, ...p.colors, p.sku]
      .join(" ")
      .toLowerCase();
    return terms.every((t) => haystack.includes(t));
  });
};