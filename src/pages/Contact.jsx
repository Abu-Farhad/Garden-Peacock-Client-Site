import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function validate(values) {
    const newErrors = {};

    if (!values.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (values.name.trim().length < 2) {
      newErrors.name = "Full name must be at least 2 characters";
    }

    if (!values.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(values.phone.trim())) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (!values.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(values.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    if (!values.message.trim()) {
      newErrors.message = "Message is required";
    } else if (values.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setSuccess("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate(form);
    setErrors(validationErrors);
    setSuccess("");

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setSubmitting(true);

      // Later this will be replaced with axios POST request
      // await axios.post("/api/inquiries", form);

      await new Promise((resolve) => setTimeout(resolve, 700));

      setSuccess("Your inquiry has been submitted successfully.");
      setForm(initialForm);
      setErrors({});
    } catch (error) {
      setSuccess("");
      setErrors({
        form: "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="bg-white">
        <section className="bg-gradient-to-br from-green-50 to-lime-100 py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h1 className="text-4xl font-extrabold text-gray-900 md:text-5xl">
              Contact Us
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
              Have a question about products, pricing, or availability? Send us
              your inquiry and we will get back to you.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="rounded-2xl bg-green-50 p-8">
              <h2 className="text-2xl font-bold text-gray-900">Get In Touch</h2>

              <div className="mt-6 space-y-4 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Phone:</span> +91 XXXXX XXXXX
                </p>
                <p>
                  <span className="font-semibold">Email:</span> info@gardenpeacock.com
                </p>
                <p>
                  <span className="font-semibold">Address:</span> Your business address here
                </p>
              </div>

              <div className="mt-8 rounded-2xl border border-dashed border-green-300 bg-white p-6 text-center text-sm text-gray-500">
                Google Map will be added later
              </div>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-green-100">
              <h2 className="text-2xl font-bold text-gray-900">Send Inquiry</h2>

              {success ? (
                <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                  {success}
                </div>
              ) : null}

              {errors.form ? (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errors.form}
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
                      errors.name
                        ? "border-red-300 focus:border-red-500"
                        : "border-green-200 focus:border-green-500"
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name ? (
                    <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                  ) : null}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
                      errors.phone
                        ? "border-red-300 focus:border-red-500"
                        : "border-green-200 focus:border-green-500"
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone ? (
                    <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                  ) : null}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
                      errors.email
                        ? "border-red-300 focus:border-red-500"
                        : "border-green-200 focus:border-green-500"
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email ? (
                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                  ) : null}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="5"
                    className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
                      errors.message
                        ? "border-red-300 focus:border-red-500"
                        : "border-green-200 focus:border-green-500"
                    }`}
                    placeholder="Write your message"
                  />
                  {errors.message ? (
                    <p className="mt-2 text-sm text-red-600">{errors.message}</p>
                  ) : null}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className={`rounded-xl px-6 py-3 font-semibold text-white transition ${
                    submitting
                      ? "cursor-not-allowed bg-green-400"
                      : "bg-green-700 hover:bg-green-800"
                  }`}
                >
                  {submitting ? "Submitting..." : "Submit Inquiry"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}