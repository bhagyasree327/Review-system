import { NextResponse }
from "next/server";

import bcrypt from "bcrypt";

import { db }
from "~/server/db";

export async function POST(
  req: Request,
) {

  const body =
    await req.json();

  const {
    email,
    password,
    businessId,
  } = body;

  const hashedPassword =
    await bcrypt.hash(
      password,
      10,
    );

  await db.user.create({
    data: {
      email,
      password:
        hashedPassword,

      role: "OWNER",

      businessId,
    },
  });

  return NextResponse.json({
    success: true,
  });
}