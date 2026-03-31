import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-green-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div>
          <Link to="/" className="block">
            <h1 className="text-2xl font-bold tracking-tight text-green-700">
              Garden Peacock
            </h1>
            <p className="text-xs text-gray-500">
              Garden essentials for every space
            </p>
          </Link>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <Link to="/" className="text-sm font-medium text-gray-700 hover:text-green-700">
            Home
          </Link>
          <Link to="/about" className="text-sm font-medium text-gray-700 hover:text-green-700">
            About
          </Link>
          <Link to="/products" className="text-sm font-medium text-gray-700 hover:text-green-700">
            Products
          </Link>
          <Link to="/contact" className="text-sm font-medium text-gray-700 hover:text-green-700">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden rounded-lg border border-green-700 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-50 md:inline-block"
          >
            Call Now
          </Link>

          <Link
            to="/products"
            className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </header>
  );
}