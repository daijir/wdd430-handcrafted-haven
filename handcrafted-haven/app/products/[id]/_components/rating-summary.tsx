import type { ReviewStats } from "../../../../lib/definitions";
import { StarRating } from "./star-rating";

type RatingSummaryProps = {
  stats: ReviewStats;
};

export const RatingSummary = ({ stats }: RatingSummaryProps) => {
  if (stats.totalReviews === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        No ratings yet
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <div className="flex items-center gap-4 mb-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900">
            {stats.averageRating.toFixed(1)}
          </div>
          <StarRating rating={stats.averageRating} size="md" />
          <p className="text-sm text-gray-600 mt-1">
            {stats.totalReviews} {stats.totalReviews === 1 ? "review" : "reviews"}
          </p>
        </div>

        <div className="flex-1">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution];
            const percentage = stats.totalReviews > 0
              ? (count / stats.totalReviews) * 100
              : 0;

            return (
              <div key={rating} className="flex items-center gap-2 mb-1">
                <span className="text-sm text-gray-600 w-8">{rating}★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};