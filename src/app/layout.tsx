import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Navbar } from "@/components/ui/navbar";
import { KiroSection } from "@/components/sections/kiro-section";
import { ThemeProvider } from "next-themes";
import SEO from "@/lib/seo";
import { SchemaMarkup } from "@/components/schema-markup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SEO.url),
  title: SEO.title,
  description: SEO.description,
  keywords: SEO.keywords,
  authors: [{ name: SEO.author }],
  creator: SEO.author,
  publisher: SEO.author,
  alternates: {
    canonical: SEO.url,
  },
  openGraph: {
    ...SEO.openGraph,
  },
  twitter: {
    ...SEO.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
      <head>
        <SchemaMarkup />
      </head>
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-cyan-500/30">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <SmoothScroll>
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
