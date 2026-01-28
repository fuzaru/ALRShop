export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-700 mb-2">Have questions or need support? Reach out to us using the form below or email us at <a href="mailto:support@alrshop.com" className="text-red-600 underline">support@alrshop.com</a>.</p>
      <form className="flex flex-col gap-4 mt-6">
        <input type="text" placeholder="Your Name" className="border rounded px-3 py-2" required />
        <input type="email" placeholder="Your Email" className="border rounded px-3 py-2" required />
        <textarea placeholder="Your Message" className="border rounded px-3 py-2" rows={4} required />
        <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition">Send Message</button>
      </form>
    </div>
  );
}
