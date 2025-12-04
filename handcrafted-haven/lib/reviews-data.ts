import type { Review, ReviewStats } from "@/lib/definitions";

// In-memory storage for reviews (replace with database in production)
let reviews: Review[] = [
  {
    id: "review-1",
    productId: "1",
    userId: "user-1",
    userName: "Sarah Johnson",
    rating: 5,
    text: "Absolutely beautiful cutting board! The engraving was perfect and it made a wonderful wedding gift. Highly recommend!",
    timestamp: new Date("2024-11-15"),
  },
  {
    id: "review-2",
    productId: "1",
    userId: "user-2",
    userName: "Mike Chen",
    rating: 4,
    text: "Great quality wood and craftsmanship. Only wish it was slightly larger, but overall very happy with the purchase.",
    timestamp: new Date("2024-11-20"),
  },
  {
    id: "review-3",
    productId: "2",
    userId: "user-3",
    userName: "Emily Rodriguez",
    rating: 5,
    text: "This mug is gorgeous! The ceramic work is stunning and it's the perfect size for my morning coffee.",
    timestamp: new Date("2024-11-18"),
  },
];

export const getReviewsByProductId = async (productId: string): Promise<Review[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  return reviews
    .filter((review) => review.productId === productId)
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export const getReviewStats = async (productId: string): Promise<ReviewStats> => {
  const productReviews = await getReviewsByProductId(productId);
  
  if (productReviews.length === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    };
  }

  const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / productReviews.length;

  const ratingDistribution = productReviews.reduce(
    (dist, review) => {
      dist[review.rating as keyof typeof dist]++;
      return dist;
    },
    { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  );

  return {
    averageRating,
    totalReviews: productReviews.length,
    ratingDistribution,
  };
};

export const addReview = async (review: Omit<Review, "id" | "timestamp">): Promise<Review> => {
  const newReview: Review = {
    ...review,
    id: `review-${Date.now()}`,
    timestamp: new Date(),
  };
  
  reviews.push(newReview);
  return newReview;
};