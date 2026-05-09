import { db }
from "~/server/db";

import ReviewForm
from "~/components/review-form";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ReviewPage({
  params,
}: Props) {

  const { slug } =
    await params;

  const business =
    await db.business.findUnique({
      where: {
        slug,
      },
    });

  if (!business) {

    return (
      <main className="flex min-h-screen items-center justify-center">

        <h1 className="text-3xl font-bold">
          Business not found
        </h1>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">

      <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow-xl">

        {/* Logo */}
        <div className="text-center">

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-4xl text-white shadow-xl">
            🏪
          </div>

          {/* Dynamic Business */}
          <h1 className="mt-8 text-5xl font-bold">
            {business.name}
          </h1>

          <p className="mt-4 text-lg text-gray-500">
            We'd love your feedback!
          </p>

        </div>

        {/* Form */}
        <div className="mt-10">

          <ReviewForm
            businessId={
              business.id
            }
            googleUrl={
              business.googleUrl
            }
          />

        </div>

      </div>
    </main>
  );
}