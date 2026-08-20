export const BRAND = {
  name: "HAIRA Collections",
  tagline: "Elegance in Every Thread",
  whatsappNumber: "918978363552",
  whatsappDisplay: "+91 89783 63552",
  instagram: "haira_collections_",
  instagramUrl: "https://instagram.com/haira_collections_",
  mapsUrl: "https://maps.app.goo.gl/jGES6Kw9iPTTatkk6",
  shipping: "Shipping across India",
};

export const whatsappLink = (message: string) =>
  `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const waMessages = {
  general: "Hello HAIRA Collections, I would like to know more about your collection.",
  product: (name: string) =>
    `Hello HAIRA Collections, I am interested in ${name}. Please share the details.`,
  order: (name: string) => `Hello HAIRA Collections, I would like to order ${name}.`,
  cart: "Hello HAIRA Collections, I would like to place an order for the products in my cart.",
};