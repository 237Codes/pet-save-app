'use client'

import { useState, useEffect } from 'react'
import {inter} from 'next/font/google'

//header
//sidebar

import {Toaster} from 'react-hot-toast'

const inter = Inter({ subsets: ['latin']})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [totalEarnings, setTotalEarnings] = useState(0)

    //useEffect

    return (
      <html lang='en'>
        <body className={inter.className}>
          <div className='min-h-screen bg-gray-50 flex flex-col'>
            {/* header */}
              <div className='flex flex=1'>
              {/* sidebar */}
                <main className= 'flex-1 p-4 lg:p-8 ml-0 lg:ml-64 transition-all duration-300'
                {children}
                </main>
              </div>
              
          </div>
          <Toaster/>
        </body>
      </html>
    )
}  

/*
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
*/