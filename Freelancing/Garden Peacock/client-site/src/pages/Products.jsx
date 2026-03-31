import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import products from "../data/products";

const categories = [
  "All",
  "Garden Tools & Machines",
  "Pots & Planters",
  "Fertilizers & Soil Care",
  "Artificial Grass",
  "Vertical Garden Panels",
  "Fencing Nets",
];

export default function Products() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.desc.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  return (
    <>
      <Navbar />

      <main className="bg-white">
        <section className="bg-gradient-to-br from-green-50 to-lime-100 py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h1 className="text-4xl font-extrabold text-gray-900 md:text-5xl">
              Our Products
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
              Browse garden tools, fertilizers, planters, artificial grass,
              vertical panels, fencing nets, and more.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-green-200 px-4 py-3 outline-none focus:border-green-500"
              />
            </div>

            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-xl border border-green-200 px-4 py-3 outline-none focus:border-green-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm text-gray-500">
              Showing {filteredProducts.length} product(s)
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-green-100 transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="h-52 w-full overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center border border-dashed border-green-300 bg-green-100">
                      <div className="text-4xl">📷</div>
                      <p className="mt-2 text-sm font-semibold text-green-700">
                        No Image Available
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Upload later from admin panel
                      </p>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
                    {product.category}
                  </p>

                  <h2 className="mt-2 text-lg font-bold text-gray-900">
                    {product.name}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {product.desc}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-lg font-bold text-green-700">
                      {product.price}
                    </span>

                    <Link
                      to={`/products/${product.id}`}
                      className="rounded-lg border border-green-700 px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-50"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}