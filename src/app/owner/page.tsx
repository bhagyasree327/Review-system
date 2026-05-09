import { db } from "~/server/db";

import QRCodeCard
from "~/components/qr-code";

import { redirect }
from "next/navigation";

import { auth }
from "~/server/auth";

import ReviewAnalytics
from "~/components/review-analytics";

import LogoutButton
from "~/components/logout-button";

export default async function OwnerPage() {

  // Auth Check
  const session =
    await auth();

  if (!session) {
    redirect("/login");
  }

  // Business
  const business =
  await db.business.findFirst({
    where: {
      users: {
        some: {
          id:
            session.user.id,
        },
      },
    },
  });

  if (!business) {
    return (
      <main className="p-10">
        No business found
      </main>
    );
  }

  // QR URL
const reviewUrl =
`${process.env.NEXT_PUBLIC_APP_URL}/r/${business.slug}`;

  // Reviews
  const reviews =
    await db.review.findMany({
      where: {
        businessId:
          business.id,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  // Stats
  const totalReviews =
    reviews.length;

  const avgRating =
    totalReviews > 0
      ? (
          reviews.reduce(
            (acc, review) =>
              acc +
              review.rating,
            0,
          ) / totalReviews
        ).toFixed(1)
      : "0";

  const positiveReviews =
    reviews.filter(
      (r) => r.rating >= 4,
    ).length;

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          {/* Left */}
          <div>

            <h1 className="text-4xl font-bold">
              Owner Dashboard
            </h1>

            <p className="mt-2 text-gray-500">
              {business.name}
            </p>

          </div>

          {/* Right */}
          <div className="flex items-center gap-3">

            {/* Search */}
            <input
              placeholder="Search reviews..."
              className="rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-indigo-500"
            />

            {/* Logout */}
            <LogoutButton />

          </div>

        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3">

          {/* Total Reviews */}
          <div className="rounded-3xl bg-white p-6 shadow-xl">

            <p className="text-gray-500">
              Total Reviews
            </p>

            <h2 className="mt-3 text-5xl font-bold">
              {totalReviews}
            </h2>

          </div>

          {/* Average Rating */}
          <div className="rounded-3xl bg-white p-6 shadow-xl">

            <p className="text-gray-500">
              Average Rating
            </p>

            <h2 className="mt-3 text-5xl font-bold">
              {avgRating}
            </h2>

          </div>

          {/* Positive Reviews */}
          <div className="rounded-3xl bg-white p-6 shadow-xl">

            <p className="text-gray-500">
              Positive Reviews
            </p>

            <h2 className="mt-3 text-5xl font-bold">
              {positiveReviews}
            </h2>

          </div>

        </div>

        {/* Analytics */}
        <div className="mt-10">

          <ReviewAnalytics
            reviews={reviews}
          />

        </div>

        {/* QR + Reviews */}
        <div className="mt-10 grid gap-8 lg:grid-cols-2">

          {/* QR */}
          <QRCodeCard
            url={reviewUrl}
          />

          {/* Reviews */}
          <div className="rounded-3xl bg-white p-6 shadow-xl">

            <h2 className="text-2xl font-bold">
              Latest Reviews
            </h2>

            <div className="mt-6 space-y-4">

              {reviews.map(
                (review) => (
                  <div
                    key={review.id}
                    className="rounded-2xl border p-4"
                  >

                    {/* Top */}
                    <div className="flex items-center justify-between">

                      <p className="text-yellow-500">
                        {"★".repeat(
                          review.rating,
                        )}
                      </p>

                      <p className="text-sm text-gray-400">
                        {new Date(
                          review.createdAt,
                        ).toLocaleDateString()}
                      </p>

                    </div>

                    {/* Comment */}
                    <p className="mt-3 text-gray-700">
                      {review.comment}
                    </p>

                  </div>
                ),
              )}

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}