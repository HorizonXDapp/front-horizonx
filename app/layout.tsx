import type { Metadata } from "next";
import "./globals.css";
import { AppKit } from "./context/appkit";

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
         <body>
            <AppKit>{children}</AppKit>
         </body>
      </html>
   );
}
