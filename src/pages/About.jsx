import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function About() {
  return (
    <>
      <Navbar />

      <main className="bg-white">
        <section className="bg-gradient-to-br from-green-50 to-lime-100 py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h1 className="text-4xl font-extrabold text-gray-900 md:text-5xl">
              About Garden Peacock
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
              Garden Peacock is your trusted local garden center offering a wide
              selection of garden essentials, decorative planters, fertilizers,
              tools, artificial grass, fencing solutions, and vertical garden products.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Who We Are</h2>
              <p className="mt-4 leading-8 text-gray-600">
                We help customers transform balconies, terraces, lawns, nurseries,
                and indoor spaces with practical and attractive gardening products.
                Whether you need maintenance tools or decorative solutions, Garden
                Peacock aims to offer dependable quality and useful options.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
              <p className="mt-4 leading-8 text-gray-600">
                Our mission is to make gardening easier, more beautiful, and more
                accessible by providing quality products and helpful guidance for
                every kind of space.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-green-50 p-6">
              <h3 className="text-lg font-bold text-green-700">Quality Products</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Carefully selected items for maintenance, decoration, and plant care.
              </p>
            </div>

            <div className="rounded-2xl bg-green-50 p-6">
              <h3 className="text-lg font-bold text-green-700">Wide Variety</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                From tools and machines to planters, fertilizers, and garden decor.
              </p>
            </div>

            <div className="rounded-2xl bg-green-50 p-6">
              <h3 className="text-lg font-bold text-green-700">Customer Focused</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Helping customers choose the right products for their gardening needs.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}