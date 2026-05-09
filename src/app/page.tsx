import Link from "next/link";
import Image from "next/image";

export default function HomePage() {

  return (
    <main className="min-h-screen bg-white">

      {/* Navbar */}
<nav className="flex items-center justify-between ">

  {/* Logo */}
  <div className="flex items-center ">

    <Image
      src="/logo1.png"
      alt="ZigZex Logo"
      width={220}
      height={60}
      priority
      className=" h-50 object-contain"
    />

  </div>


</nav>

      {/* Hero Section */}
      <section className="flex min-h-[50vh] items-center justify-center px-6 pt-10">

        <div className="text-center">

          <h1 className="text-6xl font-extrabold text-gray-900">

            Welcome to
            <span className="block text-blue-600">
              ZigZex
            </span>

          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-500">

            Smart QR-based review management
            platform for modern businesses.

          </p>

  {/* Login */}
  

          <div className="mt-10">

            
<Link
    href="/login"
    className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
  >
    Login
  </Link>
          </div>

        </div>

      </section>

    </main>
  );
}