import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CategoriesSection from "../components/home/CategoriesSection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import WhyChooseUs from "../components/home/WhyChooseUs";
import ReviewsHighlight from "../components/home/ReviewsHighlight";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <section
          id="home"
          className="bg-gradient-to-br from-green-50 via-lime-50 to-emerald-100"
        >
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
            <div>
              <span className="inline-block rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
                Trusted Garden Center
              </span>

              <h1 className="mt-5 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl">
                Everything You Need To Build A Beautiful Garden
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600">
                Explore quality garden tools, decorative pots, fertilizers,
                artificial grass, vertical garden panels, fencing solutions, and
                more with Garden Peacock.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
                >
                  Explore Products
                </Link>

                <Link
                  to="/contact"
                  className="rounded-xl border border-green-700 px-6 py-3 font-semibold text-green-700 transition hover:bg-green-50"
                >
                  Contact Us
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <h3 className="font-bold text-green-700">Tools</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Trimmers, foggers, harvesters
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <h3 className="font-bold text-green-700">Planters</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Pots, nursery items, supports
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <h3 className="font-bold text-green-700">Fertilizers</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Organic care for healthy plants
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-xl md:p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-green-50 p-6">
                    <h3 className="text-lg font-bold text-green-700">
                      Artificial Grass
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Balcony, terrace, lawn and indoor decor solutions.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-lime-50 p-6">
                    <h3 className="text-lg font-bold text-green-700">
                      Vertical Panels
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Elegant green wall styling for modern interiors.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-emerald-50 p-6">
                    <h3 className="text-lg font-bold text-green-700">
                      Garden Machines
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Power tools and equipment for garden maintenance.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-teal-50 p-6">
                    <h3 className="text-lg font-bold text-green-700">
                      Decorative Pots
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Stylish planters for indoor and outdoor spaces.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 py-16">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900">
              About Garden Peacock
            </h2>
            <p className="mt-4 leading-8 text-gray-600">
              Garden Peacock is your local destination for quality garden
              essentials. From tools and fertilizers to decorative pots,
              artificial grass, and vertical garden panels, we help customers
              create beautiful and practical indoor and outdoor spaces.
            </p>
          </div>
        </section>

        <CategoriesSection />
        <FeaturedProducts />
        <WhyChooseUs />
        <ReviewsHighlight />
      </main>

      <Footer />
    </>
  );
}
