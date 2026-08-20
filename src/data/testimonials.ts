export interface Testimonial {
  name: string;
  city: string;
  rating: number;
  review: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Ananya Reddy",
    city: "Hyderabad",
    rating: 5,
    review:
      "The Banarasi saree is even richer in person. The zari work is neat and the fabric feels premium. I wore it for my sister's engagement and got compliments all evening.",
  },
  {
    name: "Meera Nair",
    city: "Kochi",
    rating: 5,
    review:
      "Ordered on WhatsApp and the whole thing took two minutes. They shared extra photos before I paid, and delivery reached me in four days.",
  },
  {
    name: "Priya Sharma",
    city: "Jaipur",
    rating: 4,
    review:
      "Lovely blush georgette saree, very light for a long function. Colour is exactly as shown on the site, which is rare.",
  },
  {
    name: "Divya Krishnan",
    city: "Chennai",
    rating: 5,
    review:
      "The cotton kurti set has become my everyday office wear. Stitching is clean and it has held up perfectly after several washes.",
  },
  {
    name: "Sneha Patil",
    city: "Pune",
    rating: 5,
    review:
      "Bought the Anarkali for Diwali. Fit was true to size and the dupatta is generous. Packaging felt like a boutique gift box.",
  },
  {
    name: "Farheen Sultana",
    city: "Vijayawada",
    rating: 4,
    review:
      "Good quality at a fair price. They answered my fabric questions patiently on WhatsApp before I ordered.",
  },
];