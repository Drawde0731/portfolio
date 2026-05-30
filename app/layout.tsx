import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Drawde.",
  description:
    "Software engineer specializing in React, Next.js, Flutter, and React Native. Building production-ready web and mobile applications across any platform.",
  keywords: [
    "Drawde",
    "Full Stack Developer",
    "Software Engineer",
    "React Developer",
    "Next.js Developer",
    "Flutter Developer",
    "React Native Developer",
    "Philippines",
    "Frontend Developer",
    "Mobile Developer",
    "TypeScript",
    "Node.js",
  ],
  authors: [{ name: "Drawde" }],
  creator: "Drawde",
  openGraph: {
    title: "Drawde.",
    description:
      "Software engineer specializing in React, Next.js, Flutter, and React Native. Building production-ready web and mobile applications across any platform.",
    type: "website",
    url: "https://jecomplido.dev",
    siteName: "Drawde Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Drawde.",
    description:
      "Software engineer specializing in React, Next.js, Flutter, and React Native. Building production-ready web and mobile applications across any platform.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans bg-background text-foreground antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
