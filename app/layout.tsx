import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  style: ['normal'],
})

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const viewport = {
  width: 'device-width',
  initialScale: 1
}

export const metadata: Metadata = {
  title: "SoftWave Therapy - Preferred Therapy Services | $49 Voucher",
  description: "Revolutionary SoftWave therapy treatment for knee pain, shoulder pain, back pain, elbow pain, arthritis, carpal tunnel, joint pain & more. Claim your $49 voucher today!",
  icons: {
    icon: [
      {
        url: "/Preferred_Therapy_Services_logo.png",
        type: "image/png",
        sizes: "32x32"
      },
      {
        url: "/Preferred_Therapy_Services_logo.png",
        type: "image/png",
        sizes: "16x16"
      }
    ],
    apple: [
      {
        url: "/Preferred_Therapy_Services_logo.png",
        type: "image/png",
        sizes: "180x180"
      }
    ],
    shortcut: [{ url: "/Preferred_Therapy_Services_logo.png" }],
    other: [
      {
        rel: "icon",
        url: "/Preferred_Therapy_Services_logo.png",
      },
    ],
  },
  manifest: "/manifest.json"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/Preferred_Therapy_Services_logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/Preferred_Therapy_Services_logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/Preferred_Therapy_Services_logo.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} bg-white`}>{children}</body>
    </html>
  );
}
