"use server";

import { db }
from "~/server/db";

export async function createBusiness(
  formData: FormData,
) {

  const name =
    formData.get(
      "name",
    ) as string;

  const slug =
    formData.get(
      "slug",
    ) as string;

  const googleUrl =
    formData.get(
      "googleUrl",
    ) as string;

  if (
    !name ||
    !slug ||
    !googleUrl
  ) {
    throw new Error(
      "Missing fields",
    );
  }

  await db.business.create({
    data: {
      name,
      slug,
      googleUrl,
    },
  });

  return {
    success: true,
  };
}