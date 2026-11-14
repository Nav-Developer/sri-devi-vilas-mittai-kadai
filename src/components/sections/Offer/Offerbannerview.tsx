"use client";

import { motion } from "framer-motion";
import { Box, Container, Typography } from "@mui/material";
import { useLang } from "@/il8n/LanguageProvider";
import { urlFor } from "@/sanity/lib/image";

export type Offer = {
  _id: string;
  titleEn?: string;
  titleTa?: string;
  noteEn?: string;
  noteTa?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
};

export default function OfferBannerView({ offer }: { offer: Offer }) {
  const { t } = useLang();

  const title = t({
    en: offer.titleEn ?? "",
    ta: offer.titleTa || offer.titleEn || "",
  });
  const note = t({
    en: offer.noteEn ?? "",
    ta: offer.noteTa || offer.noteEn || "",
  });

  if (!title && !note && !offer.image) return null;

  return (
    <Box
      component="section"
      sx={{
        // clears the fixed navbar + the overhanging logo
        pt: { xs: 12, md: 16 },
        pb: { xs: 1.5, md: 2 },
        bgcolor: "var(--maroon-950)",
        borderBottom: "2px solid var(--gold-400)",
      }}
    >
      {(title || note) && (
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Container
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: { xs: 1, md: 2 },
              textAlign: "center",
            }}
          >
            <Box
              component="span"
              sx={{
                px: 1.5,
                py: 0.4,
                borderRadius: 999,
                bgcolor: "var(--gold-400)",
                color: "var(--maroon-950)",
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              {t({ en: "Offer", ta: "சலுகை" })}
            </Box>

            {title && (
              <Typography
                sx={{
                  fontFamily: "var(--font-bodoni), var(--font-tamil), serif",
                  fontWeight: 800,
                  fontSize: { xs: 18, md: 26 },
                  color: "var(--gold-400)",
                }}
              >
                {title}
              </Typography>
            )}

            {note && (
              <Typography
                sx={{
                  fontSize: { xs: 13, md: 16 },
                  color: "var(--cream-200)",
                  fontWeight: 600,
                }}
              >
                {note}
              </Typography>
            )}
          </Container>
        </motion.div>
      )}

      {offer.image && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Container sx={{ mt: { xs: 1.5, md: 2 } }}>
            <Box
              component="img"
              src={urlFor(offer.image).width(1600).fit("max").url()}
              alt={title || "Offer"}
              sx={{
                display: "block",
                width: "100%",
                height: "auto",
                borderRadius: { xs: "16px", md: "28px" },
                border: "2px solid var(--gold-400)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              }}
            />
          </Container>
        </motion.div>
      )}
    </Box>
  );
}
