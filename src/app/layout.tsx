import type { Metadata } from "next";
import { gtAlpina, halFourGrotesk } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alma Food Personality Quiz",
  description: "Discover your food personality and ideal macro balance with Alma's personalized nutrition quiz.",
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
        {children}
      </body>
    </html>
  );
}
