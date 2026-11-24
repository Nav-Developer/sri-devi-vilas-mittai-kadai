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

export const metadata = {
  title: "Sri Devi Vilas Mittai Kadai — Traditional Sweets Since 1962",
  description:
    "Sri Devi Vilas Mittai Kadai — traditional sweets since 1962. Mysore Pak, Laddu, Badusha, Jalebi, Paal Kova and more, made fresh daily.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Bakery",
              name: "Sri Devi Vilas Mittai Kadai",
              url: "https://www.sridevivilasmittaikadai.com",
              telephone: "+91 6379765853",
              openingHours: "Mo-Su 06:00-22:30",
              foundingDate: "1962",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "No. 41, Road No. 18, Moondranthal (near Gandhi Statue), Bazaar Street",
                addressLocality: "Periyakulam",
                addressRegion: "Tamil Nadu",
                postalCode: "625601",
                addressCountry: "IN",
              },
            }),
          }}
        />

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
