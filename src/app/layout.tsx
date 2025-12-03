import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { RESTAURANT_INFO } from "@/lib/constants";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: {
    default: `${RESTAURANT_INFO.name} - Authentic Indian & Nepalese Cuisine in Blackheath`,
    template: `%s | ${RESTAURANT_INFO.name}`,
  },
  description: "Experience authentic Indian and Nepalese cuisine at The Fusion restaurant in Blackheath, London. Fresh ingredients, traditional recipes, and exceptional service. Book your table or order online for delivery and pickup.",
  keywords: ["Indian restaurant", "Nepalese cuisine", "Blackheath", "London", "authentic food", "curry", "tandoor", "dal bhat", "takeaway", "delivery"],
  authors: [{ name: "The Fusion Restaurant" }],
  creator: "The Fusion Restaurant",
  publisher: "The Fusion Restaurant",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://fusionfood.co.uk"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${RESTAURANT_INFO.name} - Authentic Indian & Nepalese Cuisine`,
    description: "Experience authentic Indian and Nepalese cuisine in Blackheath, London. Fresh ingredients, traditional recipes, and exceptional service.",
    url: "https://fusionfood.co.uk",
    siteName: RESTAURANT_INFO.name,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${RESTAURANT_INFO.name} - Authentic Indian & Nepalese Cuisine`,
    description: "Experience authentic Indian and Nepalese cuisine in Blackheath, London.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${lato.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
