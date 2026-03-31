const products = [
  {
    id: 1,
    name: "Electric Grass Trimmer",
    price: "₹2,499",
    image: "",
    desc: "Powerful and efficient trimming tool for lawn and garden maintenance.",
  },
  {
    id: 2,
    name: "Fogging Machine",
    price: "₹3,999",
    image: "",
    desc: "Useful for pest control and garden care applications.",
  },
  {
    id: 3,
    name: "Organic Bone Meal Fertilizer",
    price: "₹299",
    image: "",
    desc: "Organic nutrition booster for healthy plant growth and flowering.",
  },
  {
    id: 4,
    name: "Organic Vermicompost",
    price: "₹249",
    image: "",
    desc: "Natural compost for stronger roots and improved soil health.",
  },
  {
    id: 5,
    name: "Decorative Plastic Pot",
    price: "₹199",
    image: "",
    desc: "Stylish planter suitable for indoor and outdoor decoration.",
  },
  {
    id: 6,
    name: "Indoor Vertical Garden Panel",
    price: "₹899",
    image: "",
    desc: "Elegant green wall panel for enhancing modern interiors.",
  },
];

export default function FeaturedProducts() {
  return (
    <section id="products" className="bg-green-50 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="rounded-full bg-white px-4 py-1 text-sm font-semibold text-green-700">
              Featured Products
            </span>

            <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Popular Products From Garden Peacock
            </h2>

            <p className="mt-4 text-gray-600">
              A curated collection of products customers love for maintenance,
              decoration, and plant care.
            </p>
          </div>

          <button className="w-fit rounded-xl bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800">
            View All Products
          </button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="h-48 w-full overflow-hidden">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
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

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{product.desc}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-green-700">{product.price}</span>

                  <button className="rounded-lg border border-green-700 px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-50">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}