import type { Metadata } from "next";
import { gtAlpina, halFourGrotesk } from "./fonts";
import FloatingCarousel from "@/components/FloatingCarousel";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://quiz.alma.food"),
  title: "Alma Food Personality Quiz",
  description: "Discover your food personality and ideal macro balance with Alma's personalized nutrition quiz.",
  openGraph: {
    title: "Alma Food Personality Quiz",
    description: "Discover your food personality and ideal macro balance with Alma's personalized nutrition quiz.",
    url: "https://quiz.alma.food",
    siteName: "Alma",
    images: [
      {
        url: "/favicon.ico",
        width: 32,
        height: 32,
        alt: "Alma Food Personality Quiz",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alma Food Personality Quiz",
    description: "Discover your food personality and ideal macro balance with Alma's personalized nutrition quiz.",
    images: ["/favicon.ico"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${gtAlpina.variable} ${halFourGrotesk.variable} font-body antialiased`}
      >
        <FloatingCarousel />
        {children}
      </body>
    </html>
  );
}
