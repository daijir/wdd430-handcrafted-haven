import type { Product, Seller } from "@/lib/definitions";

/* -------------------------------------------------------------------------- */
/*                               MOCK SELLER DATA                             */
/* -------------------------------------------------------------------------- */
/**
 * TODO Backend:
 * Replace this mock array with a real database query.
 * Example: SELECT * FROM sellers;
 */
const sellers: Seller[] = [
  {
    id: "seller-1",
    name: "Alice's Atelier",
    email: "alice@example.com",
    bio: "I create cozy, handwoven textiles and ceramics inspired by nature and slow living.",
    profileImageUrl: "https://via.placeholder.com/300x300.png?text=Alice",
  },
  {
    id: "seller-2",
    name: "Bob's Bodega",
    email: "bob@example.com",
    bio: "I specialize in reclaimed-wood furniture and rustic home décor with a modern twist.",
    profileImageUrl: "https://via.placeholder.com/300x300.png?text=Bob",
  },
  {
    id: "seller-3",
    name: "Charlie's Crafts",
    email: "charlie@example.com",
    bio: "Paper goods, lino prints, and illustration pieces made in small batches.",
    profileImageUrl: "https://via.placeholder.com/300x300.png?text=Charlie",
  },
];

/* -------------------------------------------------------------------------- */
/*                           SELLER FETCH FUNCTIONS                           */
/* -------------------------------------------------------------------------- */

/**
 * TODO Backend Team:
 * Replace with database call.
 * Example: db.seller.findMany()
 */
export const getSellers = async (): Promise<Seller[]> => {
  return sellers;
};

/**
 * TODO Backend Team:
 * Replace with real query:
 * Example: db.seller.findUnique({ where: { id } })
 */
export const getSellerById = async (
  id: string
): Promise<Seller | undefined> => {
  return sellers.find((seller) => seller.id === id);
};

/* -------------------------------------------------------------------------- */
/*                                MOCK PRODUCTS                               */
/* -------------------------------------------------------------------------- */

/**
 * TODO for Backend:
 * Replace this with real database product fetch.
 * Example: db.product.findMany()
 */
export const getProducts = async (): Promise<Product[]> => {
  return [
    {
      id: "1",
      name: "Engraved Wooden Cutting Board",
      description:
        "A personalized cutting board, perfect as a wedding or housewarming gift.",
      price: 45,
      category: "Kitchen Goods",
      sellerId: "seller-1",
      imageUrl: "https://via.placeholder.com/300x300.png?text=Cutting+Board",
    },
    {
      id: "2",
      name: "Original Ceramic Mug",
      description:
        "A one-of-a-kind handmade ceramic mug. Perfect for coffee time.",
      price: 25,
      category: "Kitchen Goods",
      sellerId: "seller-2",
      imageUrl: "https://via.placeholder.com/300x300.png?text=Ceramic+Mug",
    },
    {
      id: "3",
      name: "Linen Tote Bag",
      description:
        "A durable and easy-to-use linen tote bag. Convenient for shopping.",
      price: 38,
      category: "Bags",
      sellerId: "seller-3",
      imageUrl: "https://via.placeholder.com/300x300.png?text=Linen+Tote+Bag",
    },
    {
      id: "4",
      name: "Hammered Silver Ring",
      description:
        "A simple, elegant silver ring with a hammered texture. Goes well with any outfit.",
      price: 58,
      category: "Jewelry",
      sellerId: "seller-1",
      imageUrl: "https://via.placeholder.com/300x300.png?text=Silver+Ring",
    },
    {
      id: "5",
      name: "Scented Soy Candle",
      description:
        "A hand-poured soy wax candle with a calming lavender and vanilla scent.",
      price: 22,
      category: "Home Decor",
      sellerId: "seller-2",
      imageUrl: "https://via.placeholder.com/300x300.png?text=Soy+Candle",
    },
    {
      id: "6",
      name: "Watercolor Landscape Painting",
      description:
        "An original 5x7 watercolor painting of a serene mountain landscape.",
      price: 120,
      category: "Art & Collectibles",
      sellerId: "seller-3",
      imageUrl: "https://via.placeholder.com/300x300.png?text=Painting",
    },
    {
      id: "7",
      name: "Hand-Dyed T-Shirt",
      description:
        "A unique tie-dye t-shirt made with eco-friendly, vibrant dyes. 100% cotton.",
      price: 35,
      category: "Clothing",
      sellerId: "seller-1",
      imageUrl: "https://via.placeholder.com/300x300.png?text=T-Shirt",
    },
    {
      id: "8",
      name: "Wooden Animal Puzzle",
      description:
        "A charming and durable wooden puzzle for young children, shaped like a friendly bear.",
      price: 28,
      category: "Toys & Games",
      sellerId: "seller-2",
      imageUrl: "https://via.placeholder.com/300x300.png?text=Puzzle",
    },
    {
      id: "9",
      name: "Recycled Paper Journal",
      description:
        "A beautiful A5 journal made from 100% recycled paper, perfect for notes and sketches.",
      price: 18,
      category: "Stationery",
      sellerId: "seller-3",
      imageUrl: "https://via.placeholder.com/300x300.png?text=Journal",
    },
    {
      id: "10",
      name: "Macrame Wall Hanging",
      description:
        "An intricate macrame piece that adds a bohemian touch to any room.",
      price: 65,
      category: "Home Decor",
      sellerId: "seller-1",
      imageUrl: "https://via.placeholder.com/300x300.png?text=Macrame",
    },

    // ... continued products unchanged ...
    {
      id: "20",
      name: "Lino Print Art",
      description:
        "An original linocut block print of a botanical design, printed on archival paper.",
      price: 40,
      category: "Art & Collectibles",
      sellerId: "seller-2",
      imageUrl: "https://via.placeholder.com/300x300.png?text=Lino+Print",
    },
  ];
};
