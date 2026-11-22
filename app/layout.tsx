import type { Metadata } from "next";
import { Inter, Roboto, Google_Sans } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";
import { ReactNode } from "react";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

export const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto'
})

export const googleSans = Google_Sans({
    subsets: ['latin'],
       variable: '--font-sans'
})

export const metadata: Metadata = {
  title: "Photo Vault",
  description: "an application for storing photos",
};


export default function RootLayout({ children, modal }: {
  children: ReactNode,
  modal: ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto.variable} ${googleSans.variable}`}>
      <body>
        <NavBar />
        {children}
        {modal}
      </body>
    </html>
  );
}
