import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.miwala.xyz/"),
  title: {
    default: "Miwa Laksmana | Full-Stack Developer Portfolio",
    template: "%s | Miwa Laksmana",
  },
  description:
    "I'm Miwa Laksmana Anthony, a Full-Stack Developer from Indonesia who builds modern, scalable, and user-focused web applications using cutting-edge technologies.",
  authors: [{ name: "Miwa Laksmana Anthony", url: "https://www.miwala.xyz/" }],
  keywords: [
    "Miwa Laksmana",
    "Miwa Laksmana Anthony",
    "Full-Stack Developer",
    "Web Developer Indonesia",
    "JavaScript Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Frontend and Backend",
    "Portfolio Website",
    "dailywebcoding",
  ],
  openGraph: {
    title: "Miwa Laksmana | Full-Stack Developer Portfolio",
    description:
      "Discover Miwa Laksmana, a Full-Stack Developer from Indonesia passionate about creating high-quality web applications with modern technologies like React, Next.js, and Node.js.",
    url: "https://www.miwala.xyz/",
    siteName: "Miwa Laksmana Portfolio",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Miwa Laksmana Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://www.miwala.xyz/",
  },
  category: "technology",
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.className} min-h-screen bg-black`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
