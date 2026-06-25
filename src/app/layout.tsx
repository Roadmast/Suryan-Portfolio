import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Navbar } from "@/components/ui/navbar";
import { GlassCursor } from "@/components/ui/glass-cursor";
import { GalaxyBackground } from "@/components/ui/galaxy-background";
import { KiroSection } from "@/components/sections/kiro-section";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Surya Narayana Siddamurthi",
  description: "A futuristic developer portfolio built with Next.js 15, TypeScript, TailwindCSS, Redis, and AI integrations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-cyan-500/30">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <SmoothScroll>
            <GalaxyBackground />
            <GlassCursor />
            <Navbar />
            <KiroSection />
            <main className="flex-1 flex flex-col mt-20 relative z-10">
              {children}
            </main>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
