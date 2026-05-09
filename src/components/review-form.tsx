"use client";

import { useState } from "react";
import StarRating from "./star-rating";
import { submitReview } from "~/app/actions";
import AISuggestions
from "./ai-suggestions";

import { suggestions }
from "~/lib/review-suggestions";

type Props = {
  businessId: string;
  googleUrl: string;
};

export default function ReviewForm({
  businessId,
  googleUrl,
}: Props) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
const smartSuggestions =
  rating >= 4
    ? suggestions.positive
    : suggestions.negative;
  const handleSubmit = async () => {
    if (!rating || !review) return;

    try {
      setLoading(true);

      await submitReview({
        businessId,
        rating,
        comment: review,
      });

      // Positive review
      if (rating >= 4) {
        window.open(
          googleUrl,
          "_blank",
        );
      } else {
        alert(
          "Thank you for your feedback!",
        );
      }

      setRating(0);
      setReview("");

    } catch (error) {
      console.error(error);

      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
const handleSuggestionClick = (
  text: string,
) => {
  setReview((prev) =>
    prev
      ? `${prev}. ${text}`
      : text,
  );
};
  return (
    <>
      {/* Rating */}
      <div className="mt-10">
        <p className="mb-5 text-center text-lg font-medium">
          How was your experience?
        </p>

        <StarRating
          rating={rating}
          setRating={setRating}
        />
      </div>

      {/* Textarea */}
      <div className="mt-8">
        <textarea
          placeholder="Write your review..."
          value={review}
          onChange={(e) =>
            setReview(e.target.value)
          }
          className="h-40 w-full rounded-2xl border border-gray-300 p-4 outline-none focus:border-indigo-500"
        />

        <p className="mt-2 text-right text-sm text-gray-400">
          {review.length}/600
        </p>
      </div>
      <AISuggestions
  suggestions={smartSuggestions}
  onSelect={
    handleSuggestionClick
  }
/>

      {/* Button */}
      <button
        disabled={loading}
        onClick={handleSubmit}
        className={`mt-8 w-full rounded-2xl py-4 text-lg font-semibold text-white transition ${
          rating >= 4
            ? "bg-green-500 hover:bg-green-600"
            : rating > 0
            ? "bg-orange-500 hover:bg-orange-600"
            : "cursor-not-allowed bg-gray-300"
        }`}
      >
        {loading
          ? "Submitting..."
          : rating >= 4
          ? "Submit & Review on Google"
          : rating > 0
          ? "Submit Feedback"
          : "Select Rating"}
      </button>
    </>
  );
}