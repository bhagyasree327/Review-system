"use client";

import { Star } from "lucide-react";

type Props = {
  rating: number;
  setRating: (value: number) => void;
};

export default function StarRating({
  rating,
  setRating,
}: Props) {
  return (
    <div className="flex justify-center gap-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => setRating(star)}
          className="transition hover:scale-110"
        >
          <Star
            className={`h-10 w-10 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
}