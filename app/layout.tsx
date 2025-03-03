import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
   title: "HorizonX",
   description: "The most advanced decentralized exchange",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body>{children}</body>
      </html>
   );
}
