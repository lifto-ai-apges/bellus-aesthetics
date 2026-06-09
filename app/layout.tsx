import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ChatWidget from "../components/chatbot/ChatWidget";
import "./globals.css";

// Premium Display Serif font
const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"]
});

// Clean body sans font
const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"]
});

export const metadata: Metadata = {
  title: "Bellus Aesthetics | Premium Aesthetic Clinic Manila & Cavite",
  description: "Experience premium, doctor-certified aesthetic transformations. Non-surgical facelifts (HIFU), fat freezing (Cryolipolysis), laser whitening, doctor procedures, and IV drip therapies in Alabang, Pasig, Manila, and Vermosa Cavite.",
  keywords: "aesthetic clinic Manila, HIFU treatment Manila, fat freezing Cavite, skin whitening laser, Botox Philippines, dermal fillers, IV drip therapy",
  metadataBase: new URL("https://bellus.ph"),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Bellus Aesthetics | Premium Aesthetic Clinic Manila & Cavite",
    description: "Experience premium, doctor-certified aesthetic transformations. Non-surgical facelifts (HIFU), fat freezing (Cryolipolysis), laser whitening, and doctor procedures.",
    url: "https://bellus.ph",
    siteName: "Bellus Aesthetics",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Bellus Aesthetics"
      }
    ],
    locale: "en_PH",
    type: "website"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
