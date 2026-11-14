"use client";

import { Box, Link, Typography } from "@mui/material";
import { store } from "@/data/store";
import { useLang } from "@/il8n/LanguageProvider";
import { ui } from "@/il8n/ui";

const INSTAGRAM_URL = "https://www.instagram.com/nk_freaky/";
const WEBSITE_URL = "https://www.naveenkumar.site";

const creditLinkSx = {
  color: "var(--gold-400)",
  fontWeight: 700,
  textDecoration: "none",
  textUnderlineOffset: "3px",
  transition: "color 0.2s ease",
  "&:hover": {
    color: "#f3d9a0",
    textDecoration: "underline",
  },
};

export default function Footer() {
  const { t } = useLang();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "var(--maroon-950)",
        color: "var(--cream-200)",
        py: 5,
        px: 2,
        textAlign: "center",
        borderTop: "3px solid",
        borderColor: "var(--gold-400)",
      }}
    >
      <Typography sx={{ fontWeight: 800, letterSpacing: "0.12em", mb: 1 }}>
        {store.fullName.toUpperCase()}
      </Typography>

      <Typography variant="body2" sx={{ opacity: 0.75, mb: 2 }}>
        {store.branches.map((b) => t(b)).join(" · ")} · {t(ui.footer.since)}{" "}
        {store.since}
      </Typography>

      <Typography variant="body2" sx={{ letterSpacing: "0.1em", opacity: 0.6 }}>
        © {new Date().getFullYear()} {store.fullName}. {t(ui.footer.rights)}
      </Typography>

      {/* Developer credit */}
      <Box
        sx={{
          mt: 3,
          pt: 2.5,
          borderTop: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            display: "block",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          Designed &amp; Developed by{" "}
          <Link
            href={WEBSITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            sx={creditLinkSx}
          >
            Naveen Kumar
          </Link>
          <Box component="span" sx={{ mx: 1 }}>
            ·
          </Box>
          <Link
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            sx={creditLinkSx}
          >
            Instagram ↗
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
