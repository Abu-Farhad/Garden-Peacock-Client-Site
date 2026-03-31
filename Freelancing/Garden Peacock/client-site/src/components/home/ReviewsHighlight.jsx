const reviews = [
  {
    id: 1,
    name: "Local Customer",
    text: "Very good quality products and helpful support. The planters and fertilizers were excellent.",
  },
  {
    id: 2,
    name: "Home Gardener",
    text: "I found useful gardening items at a fair price. Good collection for home gardens.",
  },
  {
    id: 3,
    name: "Plant Lover",
    text: "Nice selection of pots and garden decor. Looking forward to buying again.",
  },
];

export default function ReviewsHighlight() {
  return (
    <section className="bg-green-900 py-16 text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-2xl">
          <span className="rounded-full bg-white/10 px-4 py-1 text-sm font-semibold text-green-100">
            Customer Reviews
          </span>

          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            Loved By Garden Enthusiasts
          </h2>

          <p className="mt-4 text-green-100">
            A strong local impression with highly rated service and quality products.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-2xl bg-white/10 p-6 backdrop-blur">
              <div className="mb-4 flex gap-1 text-yellow-300">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>

              <p className="text-sm leading-7 text-green-50">“{review.text}”</p>
              <h3 className="mt-4 font-semibold text-white">{review.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}