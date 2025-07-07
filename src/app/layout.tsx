import "~/styles/globals.css";

import { type Metadata } from "next";
import { Poppins } from "next/font/google";

export const metadata: Metadata = {
  title: "The Cutoff Website",
  description: "Your go-to JEE cutoff analysis tool",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: "300"
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>{children}</body>
    </html>
  );
}
