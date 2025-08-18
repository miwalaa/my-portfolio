"use client";

import { motion, Variants } from "framer-motion";

export default function ContactSection() {

  // Animation variants
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <motion.section
      id="contact"
      className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      <motion.div className="text-center mb-12" variants={item}>
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Get in Touch
        </h2>
      </motion.div>
      <motion.div
        className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 hover:border-green-500/50 transition-colors hover:shadow-sm"
        variants={item}
      >
        <motion.form
          className="space-y-6 max-w-2xl mx-auto"
          variants={container}
        >
          <motion.div className="space-y-4" variants={item}>
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
          </motion.div>

          <motion.div className="space-y-4" variants={item}>
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
          </motion.div>

          <motion.div className="space-y-4" variants={item}>
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
          </motion.div>

          <motion.div className="pt-6" variants={item}>
            <button
              type="submit"
              className="w-full py-2 px-4 text-lg font-semibold rounded-lg bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30 transition-colors duration-200"
            >
              Send Message
            </button>
          </motion.div>
        </motion.form>

        <motion.p className="mt-6 text-center text-gray-400" variants={item}>
          Or connect with me on{" "}
          <a
            href="https://www.linkedin.com/in/miwa-laksmana/"
            className="text-green-400 hover:text-green-300 font-medium transition-colors hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </motion.p>
      </motion.div>
    </motion.section>
  );
}
