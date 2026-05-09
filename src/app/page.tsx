"use client";

import Link from "next/link";
import { useState } from "react";

import StarRating from "~/components/star-rating";
import AISuggestions from "~/components/ai-suggestions";

import { suggestions }
from "~/lib/review-suggestions";

import { submitReview }
from "~/app/actions";

export default function HomePage() {

  const [rating, setRating] =
    useState(0);

  const [review, setReview] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const smartSuggestions =
    rating >= 4
      ? suggestions.positive
      : suggestions.negative;

  const handleSuggestionClick = (
    text: string,
  ) => {

    setReview((prev) =>
      prev
        ? `${prev}. ${text}`
        : text,
    );
  };

  const handleSubmit =
    async () => {

      if (!rating) {
        alert(
          "Please select rating",
        );

        return;
      }

      if (!review.trim()) {
        alert(
          "Please write review",
        );

        return;
      }

      try {

        setLoading(true);

        await submitReview({
          businessId:
            "cmox5tx520000vusspxlpwnzx",
          rating,
          comment: review,
        });

        if (rating >= 4) {

          window.open(
            "https://maps.google.com",
            "_blank",
          );

        } else {

          alert(
            "Feedback submitted successfully",
          );
        }

        setRating(0);
        setReview("");

      } catch (error) {

        console.error(error);

        alert(
          "Something went wrong",
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <main className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b bg-white px-6 py-4">

        <div className="mx-auto flex max-w-7xl items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2 text-xl font-bold">
            ⭐ ReviewFlow
          </div>

          {/* Login */}
          <Link
            href="/login"
            className="rounded-xl bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Login
          </Link>

        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-14">

        <div className="mx-auto max-w-xl text-center">

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-4xl text-white shadow-xl">
            🏪
          </div>

          <h1 className="mt-8 text-5xl font-bold">
            Cafe Royal
          </h1>

          <p className="mt-4 text-lg text-gray-500">
            We'd love to hear your feedback!
          </p>

        </div>
      </section>

      {/* Review Card */}
      <section className="px-6 pb-20">

        <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow-xl">

          <p className="mb-6 text-center text-lg font-medium">
            How would you rate your experience?
          </p>

          {/* Stars */}
          <StarRating
            rating={rating}
            setRating={setRating}
          />

          {/* Textarea */}
          <textarea
            placeholder="Share your experience..."
            value={review}
            onChange={(e) =>
              setReview(
                e.target.value,
              )
            }
            className="mt-8 h-36 w-full rounded-2xl border border-gray-300 p-4 outline-none focus:border-indigo-500"
          />

          {/* Count */}
          <p className="mt-2 text-right text-sm text-gray-400">
            {review.length}/600
          </p>

          {/* AI Suggestions */}
          {rating > 0 && (
            <AISuggestions
              suggestions={
                smartSuggestions
              }
              onSelect={
                handleSuggestionClick
              }
            />
          )}

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

          <p className="mt-6 text-center text-sm text-gray-400">
            Your feedback helps us improve ✨
          </p>

        </div>
      </section>
    </main>
  );
}