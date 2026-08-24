import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { ClerkProvider } from "@clerk/nextjs";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "I buit this - Share your project online",
  description:
    "Share your project online and get feedback from the community. Discover new projects and connect with creators. ",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider>

   
    <html lang="en" className={`${poppins.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
     </ClerkProvider>
  );
}
