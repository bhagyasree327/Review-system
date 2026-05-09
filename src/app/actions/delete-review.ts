"use server";

import { db } from "~/server/db";

export async function deleteReview(id: string) {
  await db.review.delete({
    where: { id },
  });
}