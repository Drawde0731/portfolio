import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
    url: "https://drawde-portfolio.vercel.app",
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
    <html lang="en">
      <body className={`${spaceGrotesk.variable} font-sans bg-white text-foreground antialiased`}>
        <Navbar />
        {children}
        <Footer />

        {/* Dify chatbot */}
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.difyChatbotConfig = {
                token: 'ExKbWXcIrLCP0fZt',
                userVariables: { name: 'Drawde' }
              };
            `,
          }}
        />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          src="https://udify.app/embed.min.js"
          id="NST9dCAAREUxxD4A"
          defer
        />
      </body>
    </html>
  );
}
