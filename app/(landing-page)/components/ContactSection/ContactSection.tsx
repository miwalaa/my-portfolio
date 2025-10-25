'use client'

import { motion, Variants } from 'framer-motion'
import { useState } from 'react'
import emailjs from '@emailjs/browser'

type FormData = {
  name: string
  email: string
  message: string
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean
    message: string
  } | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setSubmitStatus({
        success: false,
        message: 'Please fill in all fields',
      })
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({
        success: false,
        message: 'Please enter a valid email address',
      })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          time: new Date().toLocaleString(), // Add current time
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )

      setSubmitStatus({
        success: true,
        message: "Message sent successfully! I'll get back to you soon.",
      })

      // Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
      })
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus({
        success: false,
        message: 'Failed to send message. Please try again later.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
  }

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut' as const,
      },
    },
  }

  return (
    <motion.section
      id="contact"
      className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      <motion.div className="text-center mb-8 md:mb-12" variants={item}>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
          Get in Touch
        </h2>
      </motion.div>
      <motion.div
        className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 border border-gray-700/50 hover:border-green-500/50 transition-colors hover:shadow-sm"
        variants={item}
      >
        <motion.form
          className="space-y-4 sm:space-y-6 max-w-2xl mx-auto"
          variants={container}
          onSubmit={handleSubmit}
        >
          <motion.div className="space-y-4" variants={item}>
            <label htmlFor="name" className="text-gray-300 text-sm font-medium">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full p-3 sm:p-4 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all text-sm sm:text-base"
              disabled={isSubmitting}
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
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full p-3 sm:p-4 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all text-sm sm:text-base"
              disabled={isSubmitting}
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
              value={formData.message}
              onChange={handleChange}
              placeholder="How can I help you?"
              className="w-full p-3 sm:p-4 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 h-32 sm:h-40 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all resize-none text-sm sm:text-base"
              disabled={isSubmitting}
              required
            ></textarea>
          </motion.div>

          <motion.div className="pt-6" variants={item}>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 px-4 text-base sm:text-lg font-semibold rounded-lg border transition-colors duration-200 ${
                isSubmitting
                  ? 'bg-green-500/10 text-green-300/50 border-green-500/10 cursor-not-allowed'
                  : 'bg-green-500/20 text-green-300 border-green-500/30 hover:bg-green-500/30'
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            {submitStatus && (
              <div
                className={`mt-4 p-3 rounded-lg text-sm ${
                  submitStatus.success
                    ? 'bg-green-500/10 text-green-300'
                    : 'bg-red-500/10 text-red-300'
                }`}
              >
                {submitStatus.message}
              </div>
            )}
          </motion.div>
        </motion.form>

        <motion.p
          className="mt-4 sm:mt-6 text-center text-sm sm:text-base text-gray-400"
          variants={item}
        >
          Or connect with me on{' '}
          <a
            href="https://www.linkedin.com/in/miwa-laksmana-anthony-851a17344/"
            className="text-green-400 hover:text-green-300 font-medium transition-colors hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </motion.p>
      </motion.div>
    </motion.section>
  )
}
