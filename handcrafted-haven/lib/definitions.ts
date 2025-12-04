export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  sellerId: string;
};

export type Seller = {
  id: string;
  name: string;
  email: string;
  bio?: string;
  profileImageUrl?: string;
};

