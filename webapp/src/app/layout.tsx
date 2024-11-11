import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans();

export const metadata: Metadata = {
  title: "Curious Surveys",
  description: "An app by Curious Programmer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.className} antialiased bg-gray-50 dark:bg-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
