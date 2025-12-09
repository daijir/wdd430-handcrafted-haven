import type { Review } from "../../../lib/definitions";
import { StarRating } from "./star-rating";

type ReviewListProps = {
  reviews: Review[];
};

export const ReviewList = ({ reviews }: ReviewListProps) => {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No reviews yet. Be the first to review this product!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="font-semibold text-gray-900">{review.userName}</p>
              <p className="text-sm text-gray-500">
                {new Date(review.timestamp).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <StarRating rating={review.rating} size="sm" />
          </div>
          <p className="text-gray-700 mt-2">{review.text}</p>
        </div>
      ))}
    </div>
  );
};