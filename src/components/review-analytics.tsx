"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type Props = {
  reviews: {
    rating: number;
  }[];
};

export default function ReviewAnalytics({
  reviews,
}: Props) {

  // Rating distribution
  const distribution = [
    1, 2, 3, 4, 5,
  ].map((star) => ({
    rating: `${star}★`,
    count: reviews.filter(
      (r) =>
        r.rating === star,
    ).length,
  }));

  // Positive vs Negative
  const positive =
    reviews.filter(
      (r) => r.rating >= 4,
    ).length;

  const negative =
    reviews.filter(
      (r) => r.rating < 4,
    ).length;

  const sentimentData = [
    {
      name: "Positive",
      value: positive,
    },
    {
      name: "Negative",
      value: negative,
    },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-2">

      {/* Bar Chart */}
      <div className="rounded-3xl bg-white p-6 shadow-xl">

        <h2 className="mb-6 text-2xl font-bold">
          Rating Distribution
        </h2>

        <div className="h-80">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={distribution}
            >
              <XAxis dataKey="rating" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>

        </div>
      </div>

      {/* Pie Chart */}
      <div className="rounded-3xl bg-white p-6 shadow-xl">

        <h2 className="mb-6 text-2xl font-bold">
          Sentiment Analysis
        </h2>

        <div className="h-80">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>

              <Pie
                data={sentimentData}
                dataKey="value"
                outerRadius={100}
                label
              >
                {sentimentData.map(
                  (
                    entry,
                    index,
                  ) => (
                    <Cell
                      key={index}
                    />
                  ),
                )}
              </Pie>

              <Tooltip />

            </PieChart>
          </ResponsiveContainer>

        </div>
      </div>

    </div>
  );
}