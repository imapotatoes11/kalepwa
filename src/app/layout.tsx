import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name={"viewport"} content={"width=device-width, initial-scale=0.7"} />
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
