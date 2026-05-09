"use client";

import { useState }
from "react";

import { useRouter }
from "next/navigation";

import { createBusiness }
from "~/app/actions/create-business";

export default function AddBusinessForm() {

  const router =
    useRouter();

  const [loading, setLoading] =
    useState(false);

  const handleSubmit =
    async (
      formData: FormData,
    ) => {

      try {

        setLoading(true);

        await createBusiness(
          formData,
        );

        alert(
          "Business created",
        );

        router.refresh();

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
    <form
      action={handleSubmit}
      className="space-y-4"
    >

      {/* Name */}
      <input
        name="name"
        placeholder="Business name"
        className="w-full rounded-2xl border border-gray-300 p-4 outline-none focus:border-indigo-500"
      />

      {/* Slug */}
      <input
        name="slug"
        placeholder="business-slug"
        className="w-full rounded-2xl border border-gray-300 p-4 outline-none focus:border-indigo-500"
      />

      {/* Google URL */}
      <input
        name="googleUrl"
        placeholder="Google review URL"
        className="w-full rounded-2xl border border-gray-300 p-4 outline-none focus:border-indigo-500"
      />

      {/* Button */}
      <button
        disabled={loading}
        className="w-full rounded-2xl bg-black py-4 text-white transition hover:bg-gray-800"
      >
        {loading
          ? "Creating..."
          : "Create Business"}
      </button>

    </form>
  );
}