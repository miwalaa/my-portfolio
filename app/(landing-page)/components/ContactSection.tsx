export default function ContactSection() {
  return (
    <section id="contact" className="py-20 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-white mb-12 text-center">
        Get in Touch
      </h2>
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 hover:border-green-500/50 transition-colors hover:shadow-sm">
        <form className="space-y-6 max-w-2xl mx-auto">
          <div className="space-y-4">
            <label htmlFor="name" className="text-gray-300 text-sm font-medium">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              className="w-full p-4 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all"
              required
            />
          </div>

          <div className="space-y-4">
            <label
              htmlFor="email"
              className="text-gray-300 text-sm font-medium"
            >
              Your Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="john@example.com"
              className="w-full p-4 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all"
              required
            />
          </div>

          <div className="space-y-4">
            <label
              htmlFor="message"
              className="text-gray-300 text-sm font-medium"
            >
              Your Message
            </label>
            <textarea
              id="message"
              placeholder="How can I help you?"
              className="w-full p-4 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 h-40 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all resize-none"
              required
            ></textarea>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full py-2 px-4 text-sm font-medium rounded-lg bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30 transition-colors duration-200"
            >
              Send Message
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Or connect with me on{" "}
          <a
            href="https://www.linkedin.com/in/miwa-laksmana/"
            className="text-green-400 hover:text-green-300 font-medium transition-colors hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </p>
      </div>
    </section>
  );
}
