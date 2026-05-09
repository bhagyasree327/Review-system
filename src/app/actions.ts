"use server";

import { db } from "~/server/db";

type ReviewData = {
  businessId: string;
  rating: number;
  comment: string;
};

export async function submitReview(
  data: ReviewData,
) {
  const sentiment =
    data.rating >= 4
      ? "positive"
      : "negative";

  await db.review.create({
    data: {
      rating: data.rating,
      comment: data.comment,
      sentiment,
      businessId: data.businessId,
    },
  });

  return {
    success: true,
  };
}