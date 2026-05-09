"use client";

import { signOut }
from "next-auth/react";

export default function LogoutButton() {

  const handleLogout =
    async () => {

      await signOut({
        callbackUrl: "/",
      });
    };

  return (
    <button
      onClick={handleLogout}
      className="rounded-2xl bg-red-500 px-5 py-3 font-medium text-white transition hover:bg-red-600"
    >
      Logout
    </button>
  );
}