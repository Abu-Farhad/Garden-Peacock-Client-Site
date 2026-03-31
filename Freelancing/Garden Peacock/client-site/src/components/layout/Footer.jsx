export default function Footer() {
  return (
    <footer id="contact" className="mt-16 bg-green-900 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <h2 className="text-2xl font-bold">Garden Peacock</h2>
          <p className="mt-3 text-sm leading-6 text-green-100">
            Your local garden center offering quality garden essentials,
            planters, fertilizers, tools, decor, and outdoor solutions.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-sm text-green-100">
            <li><a href="#home" className="hover:text-white">Home</a></li>
            <li><a href="#about" className="hover:text-white">About</a></li>
            <li><a href="#categories" className="hover:text-white">Categories</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Contact</h3>
          <div className="mt-3 space-y-2 text-sm text-green-100">
            <p>Phone: +91 XXXXX XXXXX</p>
            <p>Email: info@gardenpeacock.com</p>
            <p>Address: Your business location here</p>
          </div>
        </div>
      </div>

      <div className="border-t border-green-800 py-4 text-center text-sm text-green-200">
        © 2026 Garden Peacock. All rights reserved.
      </div>
    </footer>
  );
}