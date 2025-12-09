import type { Product, Seller } from "@/lib/definitions";

const sellers: Seller[] = [
  {
    id: "seller-1",
    name: "Alice's Atelier",
    email: "alice@example.com",
    bio: "I create cozy, handwoven textiles and ceramics inspired by nature and slow living.",
    profileImageUrl: "https://placehold.co/300x300/png?text=Alice",
  },
  {
    id: "seller-2",
    name: "Bob's Bodega",
    email: "bob@example.com",
    bio: "I specialize in reclaimed-wood furniture and rustic home décor with a modern twist.",
    profileImageUrl: "https://placehold.co/300x300/png?text=Bob",
  },
  {
    id: "seller-3",
    name: "Charlie's Crafts",
    email: "charlie@example.com",
    bio: "Paper goods, lino prints, and illustration pieces made in small batches.",
    profileImageUrl: "https://placehold.co/300x300/png?text=Charlie",
  },
];

export const getSellers = async (): Promise<Seller[]> => {
  return sellers;
};

export const getSellerById = async (
  id: string
): Promise<Seller | undefined> => {
  return sellers.find((seller) => seller.id === id);
};

// TODO: fetch products from an API
export const getProducts = async (): Promise<Product[]> => {
  // temporary hardcoded products
  return [
    {
      id: "1",
      name: "Engraved Wooden Cutting Board",
      description: "A personalized cutting board, perfect as a wedding or housewarming gift.",
      price: 45,
      category: "Kitchen Goods",
      sellerId: "seller-1",
      imageUrl: "/images/wooden-cutting-board.jpg",
    },
    {
      id: "2",
      name: "Original Ceramic Mug",
      description: "A one-of-a-kind handmade ceramic mug. Perfect for coffee time.",
      price: 25,
      category: "Kitchen Goods",
      sellerId: "seller-2",
      imageUrl: "/images/ceramic-mug.jpg",
    },
    {
      id: "3",
      name: "Linen Tote Bag",
      description: "A durable and easy-to-use linen tote bag. Convenient for shopping.",
      price: 38,
      category: "Bags",
      sellerId: "seller-3",
      imageUrl: "/images/tote-bag.jpg",
    },
    {
      id: "4",
      name: "Hammered Silver Ring",
      description: "A simple, elegant silver ring with a hammered texture. Goes well with any outfit.",
      price: 58,
      category: "Jewelry",
      sellerId: "seller-1",
      imageUrl: "/images/hammered-silver-ring.jpg",
    },
    {
      id: "5",
      name: "Scented Soy Candle",
      description: "A hand-poured soy wax candle with a calming lavender and vanilla scent.",
      price: 22,
      category: "Home Decor",
      sellerId: "seller-2",
      imageUrl: "/images/scented-soy-candle.jpg",
    },
    {
      id: "6",
      name: "Watercolor Landscape Painting",
      description: "An original 5x7 watercolor painting of a serene mountain landscape.",
      price: 120,
      category: "Art & Collectibles",
      sellerId: "seller-3",
      imageUrl: "/images/watercolor-landscape-painting.jpg",
    },
    {
      id: "7",
      name: "Hand-Dyed T-Shirt",
      description: "A unique tie-dye t-shirt made with eco-friendly, vibrant dyes. 100% cotton.",
      price: 35,
      category: "Clothing",
      sellerId: "seller-1",
      imageUrl: "/images/hand-dyed-t-shirt.jpg",
    },
    {
      id: "8",
      name: "Wooden Animal Puzzle",
      description: "A charming and durable wooden puzzle for young children, shaped like a friendly bear.",
      price: 28,
      category: "Toys & Games",
      sellerId: "seller-2",
      imageUrl: "/images/wooden-animal-puzzle.jpg",
    },
    {
      id: "9",
      name: "Recycled Paper Journal",
      description: "A beautiful A5 journal made from 100% recycled paper, perfect for notes and sketches.",
      price: 18,
      category: "Stationery",
      sellerId: "seller-3",
      imageUrl: "/images/recycled-paper-journal.jpg",
    },
    {
      id: "10",
      name: "Macrame Wall Hanging",
      description: "An intricate macrame piece that adds a bohemian touch to any room.",
      price: 65,
      category: "Home Decor",
      sellerId: "seller-1",
      imageUrl: "/images/macrame-wall-hanging.jpg",
    },
    {
      id: "11",
      name: "Polymer Clay Earrings",
      description: "Lightweight and stylish polymer clay earrings in a modern, abstract design.",
      price: 20,
      category: "Jewelry",
      sellerId: "seller-2",
      imageUrl: "/images/polymer-clay-earring.jpg",
    },
    {
      id: "12",
      name: "Leather Keychain",
      description: "A durable, handcrafted leather keychain with a solid brass clasp.",
      price: 16,
      category: "Accessories",
      sellerId: "seller-3",
      imageUrl: "/images/leather-keychain.jpg",
    },
    {
      id: "13",
      name: "Knitted Wool Scarf",
      description: "A cozy and warm scarf, hand-knitted with soft merino wool.",
      price: 75,
      category: "Clothing",
      sellerId: "seller-1",
      imageUrl: "/images/knitted-wool-scarf.jpg",
    },
    {
      id: "14",
      name: "Ceramic Plant Pot",
      description: "A stylish, hand-painted ceramic pot for your favorite houseplant.",
      price: 42,
      category: "Home Decor",
      sellerId: "seller-2",
      imageUrl: "/images/ceramic-plant-pot.jpg",
    },
    {
      id: "15",
      name: "Custom Pet Portrait",
      description: "A custom digital portrait of your beloved pet from a photo.",
      price: 95,
      category: "Art & Collectibles",
      sellerId: "seller-3",
      imageUrl: "/images/custom-pet-portrait.jpg",
    },
    {
      id: "16",
      name: "Beeswax Food Wraps",
      description: "A set of 3 reusable and eco-friendly food wraps made from organic cotton and beeswax.",
      price: 19,
      category: "Kitchen Goods",
      sellerId: "seller-1",
      imageUrl: "/images/beeswax-food-wraps.jpg",
    },
    {
      id: "17",
      name: "Leather Wallet",
      description: "A minimalist, hand-stitched leather wallet that will age beautifully over time.",
      price: 80,
      category: "Accessories",
      sellerId: "seller-2",
      imageUrl: "/images/leather-wallet.jpg",
    },
    {
      id: "18",
      name: "Handmade Soap Bar",
      description: "A natural soap bar made with shea butter and essential oils. Scent: Orange & Clove.",
      price: 9,
      category: "Bath & Beauty",
      sellerId: "seller-3",
      imageUrl: "/images/handmade-soap-bar.jpg",
    },
    {
      id: "19",
      name: "Glass Bead Necklace",
      description: "A delicate necklace featuring handmade lampwork glass beads on a sterling silver chain.",
      price: 68,
      category: "Jewelry",
      sellerId: "seller-1",
      imageUrl: "/images/glass-bead-necklace.jpg",
    },
    {
      id: "20",
      name: "Lino Print Art",
      description: "An original linocut block print of a botanical design, printed on archival paper.",
      price: 40,
      category: "Art & Collectibles",
      sellerId: "seller-2",
      imageUrl: "/images/lino-print-art.jpg",
    },
  ];
};