const categories = [
  {
    id: 1,
    name: "Garden Tools & Machines",
    desc: "Grass trimmers, fogging machines, harvesters, and more.",
  },
  {
    id: 2,
    name: "Pots & Planters",
    desc: "Decorative plastic pots, nursery pots, window planters, and garden containers.",
  },
  {
    id: 3,
    name: "Fertilizers & Soil Care",
    desc: "Organic bone meal, vermicompost, and plant growth essentials.",
  },
  {
    id: 4,
    name: "Artificial Grass",
    desc: "Stylish artificial grass for balcony, terrace, lawn, and indoor use.",
  },
  {
    id: 5,
    name: "Vertical Garden Panels",
    desc: "Beautiful green wall decor panels for indoor styling.",
  },
  {
    id: 6,
    name: "Fencing Nets",
    desc: "Bird net, pigeon net, UV stabilized fencing and crop protection nets.",
  },
];

export default function CategoriesSection() {
  return (
    <section id="categories" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-2xl">
          <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
            Categories
          </span>

          <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Explore Our Garden Essentials
          </h2>

          <p className="mt-4 text-gray-600">
            Discover a wide range of products designed to improve your garden,
            balcony, terrace, nursery, and indoor green spaces.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-green-100 bg-green-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="text-xl font-bold text-green-800">{item.name}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">{item.desc}</p>

              <button className="mt-5 text-sm font-semibold text-green-700 hover:text-green-900">
                View Category →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}