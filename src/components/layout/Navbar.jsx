import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
  ];

  // Active class helper
  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive
        ? "text-green-700 border-b-2 border-green-700 pb-1"
        : "text-gray-700 hover:text-green-700"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-green-100 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <NavLink to="/" className="block">
          <h1 className="text-lg font-bold tracking-tight text-green-700 sm:text-2xl">
            Garden Peacock
          </h1>
          <p className="hidden text-xs text-gray-500 sm:block">
            Garden essentials for every space
          </p>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.name} to={link.path} className={linkClass}>
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <NavLink
            to="/contact"
            className="rounded-lg border border-green-700 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-50"
          >
            Call Now
          </NavLink>

          <NavLink
            to="/products"
            className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
          >
            Shop Now
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex items-center justify-center rounded-lg border border-green-200 p-2 text-green-700 md:hidden"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-green-100 bg-white shadow-md md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-green-100 text-green-700"
                      : "text-gray-700 hover:bg-green-50"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <div className="mt-3 flex flex-col gap-2">
              <NavLink
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg border border-green-700 px-4 py-2 text-center text-sm font-semibold text-green-700 hover:bg-green-50"
              >
                Call Now
              </NavLink>

              <NavLink
                to="/products"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg bg-green-700 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-green-800"
              >
                Shop Now
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}