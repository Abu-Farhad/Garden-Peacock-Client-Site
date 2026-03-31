import { Link, useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import products from "../data/products";

export default function ProductDetails() {
  const { id } = useParams();

  const product = products.find((item) => String(item.id) === String(id));

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-20">
          <div className="rounded-2xl bg-red-50 p-8 text-center">
            <h1 className="text-3xl font-bold text-red-700">Product not found</h1>
            <p className="mt-3 text-gray-600">
              The requested product does not exist.
            </p>
            <Link
              to="/products"
              className="mt-6 inline-block rounded-xl bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
            >
              Back to Products
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="bg-white">
        <section className="bg-gradient-to-br from-green-50 to-lime-100 py-14">
          <div className="mx-auto max-w-7xl px-4">
            <p className="text-sm font-semibold text-green-700">{product.category}</p>
            <h1 className="mt-3 text-4xl font-extrabold text-gray-900 md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-600">
              {product.desc}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-green-100">
                <div className="h-80 w-full overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center border border-dashed border-green-300 bg-green-100">
                      <div className="text-5xl">📷</div>
                      <p className="mt-3 text-base font-semibold text-green-700">
                        No Image Available
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Upload later from admin panel
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <p className="text-3xl font-bold text-green-700">{product.price}</p>

              <p className="mt-5 leading-8 text-gray-600">{product.longDesc}</p>

              <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-900">Key Features</h2>
                <ul className="mt-4 space-y-3">
                  {product.features.map((feature, index) => (
                    <li
                      key={index}
                      className="rounded-xl bg-green-50 px-4 py-3 text-sm text-gray-700"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="rounded-xl bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
                >
                  Send Inquiry
                </Link>

                <Link
                  to="/products"
                  className="rounded-xl border border-green-700 px-6 py-3 font-semibold text-green-700 hover:bg-green-50"
                >
                  Back to Products
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}