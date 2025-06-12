import React, { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", form);
    alert("Thank you for contacting us!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        {/* LMS-related Image */}
        <div className="hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
            alt="LMS learning"
            className="rounded-lg shadow-md w-full h-auto"
          />
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-3xl font-bold text-gray-700 mb-6">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Message</label>
              <textarea
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded font-medium hover:bg-indigo-700 transition w-full"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
