const points = [
  {
    id: 1,
    title: "Wide Product Range",
    desc: "From tools and machines to pots, fertilizers, and decor items.",
  },
  {
    id: 2,
    title: "Quality You Can Trust",
    desc: "Carefully selected garden essentials for long-lasting use.",
  },
  {
    id: 3,
    title: "For Home & Commercial Needs",
    desc: "Suitable products for personal gardens, nurseries, and larger spaces.",
  },
  {
    id: 4,
    title: "Expert Guidance",
    desc: "Helpful advice to choose the right products for your garden setup.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-2 md:items-center">
        <div>
          <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
            Why Choose Us
          </span>

          <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Trusted Garden Products For Every Space
          </h2>

          <p className="mt-4 max-w-2xl text-gray-600">
            Garden Peacock provides reliable gardening products that help you
            maintain, decorate, and transform your indoor and outdoor areas.
          </p>
        </div>

        <div className="grid gap-4">
          {points.map((point) => (
            <div
              key={point.id}
              className="rounded-2xl border border-green-100 bg-green-50 p-5"
            >
              <h3 className="text-lg font-bold text-green-800">{point.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{point.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}