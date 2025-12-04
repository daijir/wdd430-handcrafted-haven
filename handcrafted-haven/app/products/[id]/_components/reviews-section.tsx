"use client";

import { useState, useEffect } from "react";
import type { Review, ReviewStats } from "../../../../lib/definitions";
import { RatingSummary } from "./rating-summary";
import { ReviewForm } from "./review-form";
import { ReviewList } from "./review-list";

type ReviewsSectionProps = {
  productId: string;
  initialReviews: Review[];
  initialStats: ReviewStats;
};

export const ReviewsSection = ({
  productId,
  initialReviews,
  initialStats,
}: ReviewsSectionProps) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [stats, setStats] = useState<ReviewStats>(initialStats);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshReviews = async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch(`/api/reviews?productId=${productId}`);
      if (response.ok) {
        const newReviews = await response.json();
        setReviews(newReviews);

        // Recalculate stats
        if (newReviews.length === 0) {
          setStats({
            averageRating: 0,
            totalReviews: 0,
            ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
          });
        } else {
          const totalRating = newReviews.reduce((sum: number, r: Review) => sum + r.rating, 0);
          const averageRating = totalRating / newReviews.length;
          const ratingDistribution = newReviews.reduce(
            (dist: ReviewStats["ratingDistribution"], r: Review) => {
              dist[r.rating as keyof typeof dist]++;
              return dist;
            },
            { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
          );

          setStats({
            averageRating,
            totalReviews: newReviews.length,
            ratingDistribution,
          });
        }
      }
    } catch (error) {
      console.error("Failed to refresh reviews:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

      <RatingSummary stats={stats} />

      <div className="mt-8">
        <ReviewForm productId={productId} onReviewSubmitted={refreshReviews} />
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          All Reviews {isRefreshing && <span className="text-sm text-gray-500">(Refreshing...)</span>}
        </h3>
        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
};