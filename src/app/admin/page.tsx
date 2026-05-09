import { db } from "~/server/db";

import { redirect }
from "next/navigation";

import { auth }
from "~/server/auth";

import LogoutButton
from "~/components/logout-button";

import AddBusinessForm
from "~/components/add-business-form";

import CreateOwnerForm
from "~/components/create-owner-form";

export default async function AdminPage() {

  // Auth
  const session =
    await auth();

  if (!session) {
    redirect("/login");
  }

  // Businesses
  const businesses =
    await db.business.findMany({
      include: {
        reviews: true,
        users: true,
      },
    });

  // Stats
  const totalBusinesses =
    businesses.length;

  const totalReviews =
    businesses.reduce(
      (acc, business) =>
        acc +
        business.reviews.length,
      0,
    );

  const totalOwners =
    businesses.reduce(
      (acc, business) =>
        acc +
        business.users.length,
      0,
    );

  const totalPositive =
    businesses.reduce(
      (acc, business) =>
        acc +
        business.reviews.filter(
          (r) =>
            r.rating >= 4,
        ).length,
      0,
    );

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          {/* Left */}
          <div>

            <h1 className="text-4xl font-bold">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-gray-500">
              Manage platform businesses
            </p>

          </div>

          {/* Right */}
          <div className="flex items-center gap-3">

            {/* Search */}
            <input
              placeholder="Search businesses..."
              className="rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-indigo-500"
            />

            {/* Logout */}
            <LogoutButton />

          </div>

        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-4">

          {/* Businesses */}
          <div className="rounded-3xl bg-white p-6 shadow-xl">

            <p className="text-gray-500">
              Businesses
            </p>

            <h2 className="mt-3 text-5xl font-bold">
              {totalBusinesses}
            </h2>

          </div>

          {/* Reviews */}
          <div className="rounded-3xl bg-white p-6 shadow-xl">

            <p className="text-gray-500">
              Reviews
            </p>

            <h2 className="mt-3 text-5xl font-bold">
              {totalReviews}
            </h2>

          </div>

          {/* Owners */}
          <div className="rounded-3xl bg-white p-6 shadow-xl">

            <p className="text-gray-500">
              Owners
            </p>

            <h2 className="mt-3 text-5xl font-bold">
              {totalOwners}
            </h2>

          </div>

          {/* Positive */}
          <div className="rounded-3xl bg-white p-6 shadow-xl">

            <p className="text-gray-500">
              Positive Reviews
            </p>

            <h2 className="mt-3 text-5xl font-bold">
              {totalPositive}
            </h2>

          </div>

        </div>

        {/* Forms */}
        <div className="mt-10 grid gap-8 lg:grid-cols-2">

          {/* Add Business */}
          <div className="rounded-3xl bg-white p-6 shadow-xl">

            <h2 className="mb-6 text-2xl font-bold">
              Add Business
            </h2>

            <AddBusinessForm />

          </div>

          {/* Create Owner */}
          <div className="rounded-3xl bg-white p-6 shadow-xl">

            <h2 className="mb-6 text-2xl font-bold">
              Create Owner
            </h2>

            <CreateOwnerForm
              businesses={businesses.map(
                (business) => ({
                  id: business.id,
                  name:
                    business.name,
                }),
              )}
            />

          </div>

        </div>

        {/* Businesses List */}
        <div className="mt-10 rounded-3xl bg-white p-6 shadow-xl">

          <h2 className="mb-6 text-2xl font-bold">
            Businesses
          </h2>

          <div className="space-y-5">

            {businesses.map(
              (business) => {

                const avgRating =
                  business.reviews
                    .length > 0
                    ? (
                        business.reviews.reduce(
                          (
                            acc,
                            review,
                          ) =>
                            acc +
                            review.rating,
                          0,
                        ) /
                        business
                          .reviews
                          .length
                      ).toFixed(1)
                    : "0";

                return (
                  <div
                    key={business.id}
                    className="rounded-3xl border border-gray-200 p-6 transition hover:shadow-lg"
                  >

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                      {/* Left */}
                      <div>

                        <h3 className="text-2xl font-bold">
                          {business.name}
                        </h3>

                        <p className="mt-2 text-gray-500">
                          /r/
                          {business.slug}
                        </p>

                      </div>

                      {/* Stats */}
                      <div className="flex gap-8">

                        {/* Reviews */}
                        <div>

                          <p className="text-sm text-gray-400">
                            Reviews
                          </p>

                          <p className="text-3xl font-bold">
                            {
                              business
                                .reviews
                                .length
                            }
                          </p>

                        </div>

                        {/* Rating */}
                        <div>

                          <p className="text-sm text-gray-400">
                            Rating
                          </p>

                          <p className="text-3xl font-bold">
                            {avgRating}
                          </p>

                        </div>

                        {/* Owners */}
                        <div>

                          <p className="text-sm text-gray-400">
                            Owners
                          </p>

                          <p className="text-3xl font-bold">
                            {
                              business
                                .users
                                .length
                            }
                          </p>

                        </div>

                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">

                        <button className="rounded-2xl border border-gray-300 px-5 py-3 transition hover:bg-gray-100">
                          View
                        </button>

                        <button className="rounded-2xl bg-red-500 px-5 py-3 text-white transition hover:bg-red-600">
                          Delete
                        </button>

                      </div>

                    </div>

                  </div>
                );
              },
            )}

          </div>

        </div>

      </div>
    </main>
  );
}