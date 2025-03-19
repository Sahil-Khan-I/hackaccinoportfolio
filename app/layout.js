import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoFont = Roboto({
  variable: "--font-roboto",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Sahil Khan - Entrepreneur & Digital Product Creator",
  description: "Discover the innovative portfolio of Sahil Khan, an entrepreneur focused on creating impactful digital products. Explore my projects and connect with me for collaboration.",
  keywords: ["entrepreneur", "digital products", "web developer", "portfolio", "Sahil Khan", "innovation", "collaboration"],
  openGraph: {
    title: "Sahil Khan - Entrepreneur & Digital Product Creator",
    description: "Explore the innovative portfolio of Sahil Khan, an entrepreneur dedicated to crafting impactful digital products.",
    type: "website",
    locale: "en_US",
    url: "https://sahilkhan.xyz",
    images: [
      {
        url: "https://sahilkhan.xyz/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sahil Khan - Entrepreneur & Digital Product Creator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahil Khan",
    description: "Discover the innovative portfolio of Sahil Khan, an entrepreneur focused on creating impactful digital products.",
    creator: "@Sahil_Khan2008",
    image: "https://sahilkhan.xyz/og-image.jpg",
  },
  robots: {
    index: true,
    follow: true,
  },
  canonical: "https://sahilkhan.xyz",
  additionalMeta: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      name: "author",
      content: "Sahil Khan",
    },
    {
      name: "theme-color",
      content: "#000000",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {metadata.additionalMeta.map((meta, index) => (
          <meta key={index} name={meta.name} content={meta.content} />
        ))}
      </head>
      <body
        className={`${interFont.variable} ${robotoFont.variable} antialiased`}
      >
        {children}
        <Analytics/>
      </body>
    </html>
  );
}
