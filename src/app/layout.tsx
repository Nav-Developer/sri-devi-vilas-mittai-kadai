import type { Metadata } from "next";
import { Bodoni_Moda, Montserrat } from "next/font/google";
import ThemeRegistry from "@/theme/ThemeRegistry";
// import IntroSplash from "@/components/animations/IntroSplash";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import StickyCTA from "@/components/layout/StickyCTA";
import { Noto_Sans_Tamil } from "next/font/google";
import { LanguageProvider } from "@/il8n/LanguageProvider";
import HideOnStudio from "@/components/layout/HideOnStudio";
import LangToggle from "@/components/ui/LangToggle";
import OfferBanner from "@/components/sections/Offer/Offerbanner";
const bodoni = Bodoni_Moda({ subsets: ["latin"], variable: "--font-bodoni" });
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Sri Devi Vilas Mittai Kadai",
  description: "Where every dish is a performance.",
};

const tamil = Noto_Sans_Tamil({
  subsets: ["tamil", "latin"],
  variable: "--font-tamil",
  weight: ["400", "600", "800"],
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bodoni.variable} ${montserrat.variable}`}>
      <body>
        <ThemeRegistry>
          <LanguageProvider>
            <HideOnStudio>
              <Navbar />
              <OfferBanner />
            </HideOnStudio>

            {children}

            <HideOnStudio>
              <Footer />
              {/* <StickyCTA /> */}
              <LangToggle />
            </HideOnStudio>
          </LanguageProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
