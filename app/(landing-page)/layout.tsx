import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://miwa-laksmana.vercel.app/"),
  title: "Miwa's Personal Portfolio",
  authors: {
    name: "Miwa Laksmana Anthony",
  },
  description:
    "I'm a Front-End Developer from Indonesia, driven by a passion for building modern web applications that not only solve problems but also create delightful user experiences.",
  openGraph: {
    title: "Miwa Laksmana",
    description:
      "I'm a Front-End Developer from Indonesia, driven by a passion for building modern web applications that not only solve problems but also create delightful user experiences.",
    url: "https://miwa-laksmana.vercel.app/",
    siteName: "my-portfolio",
    images: "/og.png",
    type: "website",
  },
  keywords: ["personal portfolio", "miwalaksmana", "dailywebcoding"],
};

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.className} min-h-screen bg-black`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="dark:bg-black bg-white dark:bg-grid-white/[0.08] bg-grid-black-[0.2] relative">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
