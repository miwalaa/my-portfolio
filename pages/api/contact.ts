import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

// Initialize Resend with your API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ message: "Please provide a valid email address" });
  }

  try {
    // Get the recipient email from environment variables or use a default
    const recipientEmail = process.env.RESEND_EMAIL_FROM;
    if (!recipientEmail) {
      throw new Error(
        "Email configuration error: RESEND_EMAIL_FROM is not set"
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: `Contact Form <${recipientEmail}>`,
      to: [recipientEmail],
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      replyTo: email,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({
        message: "Failed to send email",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message sent successfully!",
      data,
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({
      message: "An error occurred while sending your message",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
