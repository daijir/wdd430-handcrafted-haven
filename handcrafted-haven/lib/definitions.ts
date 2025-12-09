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

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'buyer' | 'seller';
};

export type Review = {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  text: string;
  timestamp: Date;
};

export type ReviewStats = {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
};
