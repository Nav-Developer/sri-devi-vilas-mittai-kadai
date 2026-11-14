"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import {
  animate,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { Box, Container, Typography } from "@mui/material";
import { useLang } from "@/il8n/LanguageProvider";
import assets from "@/assets";

const display = "var(--font-bodoni), var(--font-tamil), serif";

type L = { en: string; ta: string };

const story: L[] = [
  {
    en: "Founded in 1962 by Mr. S. Ramaraj in Periyakulam, Sridevi Vilas Sweets & Bakery began with a simple mission: serving authentic, high-quality sweets and baked treats made with heart.",
    ta: "1962-ல் திரு. எஸ். ராமராஜ் அவர்களால் பெரியகுளத்தில் தொடங்கப்பட்ட ஸ்ரீ தேவி விலாஸ் ஸ்வீட்ஸ் & பேக்கரி, மனதார தயாரிக்கப்பட்ட தரமான, உண்மையான இனிப்புகளையும் பேக்கரி பண்டங்களையும் வழங்கும் எளிய நோக்கத்துடன் தொடங்கியது.",
  },
  {
    en: "That commitment to purity and flavor was carried forward by Appa, who built decades of trust and excellence from the 1990s. Today, I carry the legacy into the third generation, running the same original branch from 1962 and blending timeless recipes with modern excellence.",
    ta: "தூய்மை மற்றும் சுவை மீதான அந்த அர்ப்பணிப்பை 1990களில் இருந்து அப்பா தொடர்ந்து, பல தசாப்த நம்பிக்கையையும் சிறப்பையும் உருவாக்கினார். இன்று, 1962-ல் தொடங்கிய அதே முதல் கிளையை நடத்தி, காலத்தால் அழியாத சுவையுடன் நவீன சிறப்பையும் கலந்து, மூன்றாம் தலைமுறையில் நான் அந்தப் பாரம்பரியத்தை முன்னெடுத்துச் செல்கிறேன்.",
  },
];

const quote: L = {
  en: "For over six decades, our recipe remains unchanged: tradition, quality, and your trust.",
  ta: "ஆறு தசாப்தங்களுக்கும் மேலாக எங்கள் செய்முறை மாறவில்லை: பாரம்பரியம், தரம், உங்கள் நம்பிக்கை.",
};

const marqueeWords: L[] = [
  { en: "Ghee", ta: "நெய்" },
  { en: "Tradition", ta: "பாரம்பரியம்" },
  { en: "Quality", ta: "தரம்" },
  { en: "Trust", ta: "நம்பிக்கை" },
  { en: "Since 1962", ta: "1962 முதல்" },
];

const stats: { to: number; suffix?: string; label: L }[] = [
  { to: 1962, label: { en: "Since", ta: "தொடக்கம்" } },
  { to: 3, label: { en: "Generations", ta: "தலைமுறைகள்" } },
  { to: 1, label: { en: "Original branch", ta: "முதல் கிளை" } },
  { to: 60, suffix: "+", label: { en: "Years of taste", ta: "ஆண்டுகள் சுவை" } },
];

const timeline: { year: L; title: L; text: L }[] = [
  {
    year: { en: "1962", ta: "1962" },
    title: { en: "The first tray", ta: "முதல் தட்டு" },
    text: {
      en: "Mr. S. Ramaraj opens Sridevi Vilas in Periyakulam with one simple mission: authentic sweets made with heart.",
      ta: "திரு. எஸ். ராமராஜ் பெரியகுளத்தில் ஸ்ரீ தேவி விலாஸைத் தொடங்குகிறார். நோக்கம் ஒன்றே: மனதார செய்த உண்மையான இனிப்புகள்.",
    },
  },
  {
    year: { en: "1990s", ta: "1990கள்" },
    title: { en: "Trust, built daily", ta: "தினமும் வளரும் நம்பிக்கை" },
    text: {
      en: "Appa carries the commitment to purity and flavor forward, building decades of trust and excellence.",
      ta: "தூய்மை மற்றும் சுவை மீதான அர்ப்பணிப்பை அப்பா தொடர்ந்து, பல தசாப்த நம்பிக்கையையும் சிறப்பையும் உருவாக்குகிறார்.",
    },
  },
  {
    year: { en: "2020s", ta: "2020கள்" },
    title: { en: "Still the original", ta: "இன்றும் அதே கடை" },
    text: {
      en: "The same taste, from the same original shop in Periyakulam where it all began in 1962.",
      ta: "1962-ல் தொடங்கிய அதே பெரியகுளம் கடையிலிருந்து, அதே சுவை.",
    },
  },
  {
    year: { en: "Today", ta: "இன்று" },
    title: { en: "The third generation", ta: "மூன்றாம் தலைமுறை" },
    text: {
      en: "I carry the legacy forward in the original branch, open every day until 10:30 PM.",
      ta: "நான் பாரம்பரியத்தை முதல் கிளையில் தொடர்கிறேன். தினமும் இரவு 10:30 வரை திறந்திருக்கும்.",
    },
  },
];

type Person = { initials: string; name: L; image: StaticImageData };

const generations: {
  badge: L;
  role: L;
  people: Person[];
  line: L;
}[] = [
  {
    badge: { en: "1962", ta: "1962" },
    role: { en: "The Founder", ta: "நிறுவனர்" },
    people: [
      {
        initials: "SR",
        name: { en: "Mr. S. Ramaraj", ta: "திரு. எஸ். ராமராஜ்" },
        image: assets.images.grandpa,
      },
    ],
    line: {
      en: "Laying the foundation of authentic taste.",
      ta: "உண்மையான சுவையின் அடித்தளத்தை அமைத்தவர்.",
    },
  },
  {
    badge: { en: "2nd Generation", ta: "2ஆம் தலைமுறை" },
    role: {
      en: "Building trust · 1990s",
      ta: "நம்பிக்கையின் வளர்ச்சி · 1990கள்",
    },
    people: [
      {
        initials: "AP",
        name: { en: "Appa", ta: "அப்பா" },
        image: assets.images.appa,
      },
    ],
    line: {
      en: "Building decades of trust & excellence.",
      ta: "பல தசாப்த நம்பிக்கையையும் சிறப்பையும் கட்டியெழுப்பியவர்.",
    },
  },
  {
    badge: { en: "3rd Generation", ta: "3ஆம் தலைமுறை" },
    role: { en: "Present day", ta: "இன்று" },
    people: [
      {
        initials: "ME",
        name: { en: "Me", ta: "நான்" },
        image: assets.images.me,
      },
    ],
    line: {
      en: "Carrying the legacy into the future.",
      ta: "பாரம்பரியத்தை எதிர்காலத்துக்கு எடுத்துச் செல்கிறேன்.",
    },
  },
];

/* ---------- small helpers ---------- */

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/*
  Photo avatar. `src` is an imported image (StaticImageData), so it goes
  through next/image. If the image fails to load, initials are shown.
*/
function PersonAvatar({
  src,
  initials,
  alt,
  overlap,
}: {
  src: StaticImageData;
  initials: string;
  alt: string;
  overlap?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <Box
      sx={{
        position: "relative",
        width: 110,
        height: 110,
        ml: overlap ? -2.5 : 0,
        borderRadius: "50%",
        overflow: "hidden",
        display: "grid",
        placeItems: "center",
        bgcolor: "var(--maroon-950)",
        border: "3px solid var(--gold-400)",
        color: "var(--gold-400)",
        fontFamily: display,
        fontWeight: 900,
        fontSize: 32,
        flexShrink: 0,
      }}
    >
      {failed ? (
        initials
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="110px"
          onError={() => setFailed(true)}
          style={{ objectFit: "cover" }}
        />
      )}
    </Box>
  );
}

function Marquee() {
  const { t } = useLang();
  const row = [...marqueeWords, ...marqueeWords];

  return (
    <Box
      sx={{
        overflow: "hidden",
        bgcolor: "var(--gold-400)",
        borderBottom: "4px solid var(--maroon-950)",
        py: { xs: 1.5, md: 2 },
      }}
    >
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        style={{ display: "flex", width: "max-content" }}
      >
        {[0, 1].map((dup) => (
          <Box key={dup} sx={{ display: "flex", alignItems: "center" }}>
            {row.map((w, i) => (
              <Box key={i} sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    fontFamily: display,
                    fontWeight: 900,
                    textTransform: "uppercase",
                    fontSize: { xs: 26, md: 44 },
                    lineHeight: 1,
                    px: { xs: 2, md: 4 },
                    color: i % 2 ? "var(--maroon-950)" : "transparent",
                    WebkitTextStroke: i % 2 ? "0" : "2px var(--maroon-950)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t(w)}
                </Typography>
                <Box
                  component="span"
                  sx={{
                    color: "var(--maroon-950)",
                    fontSize: { xs: 18, md: 28 },
                  }}
                >
                  ✦
                </Box>
              </Box>
            ))}
          </Box>
        ))}
      </motion.div>
    </Box>
  );
}

function Timeline() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const dotTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Container sx={{ py: { xs: 8, md: 12 } }}>
      <Typography
        sx={{
          fontFamily: display,
          fontWeight: 900,
          fontSize: { xs: 30, md: 48 },
          color: "var(--maroon-950)",
          mb: { xs: 5, md: 8 },
          textAlign: { md: "center" },
        }}
      >
        {t({ en: "Our timeline", ta: "எங்கள் பயணம்" })}
      </Typography>

      <Box
        ref={ref}
        sx={{
          position: "relative",
          display: "grid",
          gap: { xs: 6, md: 9 },
          pl: { xs: 4, md: 0 },
        }}
      >
        {/* track + drawing line + ember */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: { xs: 7, md: "50%" },
            width: 3,
            bgcolor: "rgba(43,10,12,0.12)",
            transform: { md: "translateX(-50%)" },
          }}
        >
          <motion.div
            style={{
              scaleY: scrollYProgress,
              transformOrigin: "top",
              height: "100%",
              background: "var(--gold-400)",
            }}
          />
          <motion.div
            style={{
              position: "absolute",
              left: "50%",
              top: dotTop,
              x: "-50%",
              y: "-50%",
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "var(--gold-400)",
              border: "4px solid var(--maroon-950)",
              boxShadow:
                "0 0 0 6px rgba(244,185,66,0.35), 0 0 24px 6px rgba(244,185,66,0.6)",
            }}
          />
        </Box>

        {timeline.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
          >
            <Box
              sx={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: { md: "1fr 1fr" },
                columnGap: 12,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  left: { xs: -32, md: "50%" },
                  top: 14,
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  bgcolor: "var(--maroon-950)",
                  border: "4px solid var(--gold-400)",
                  transform: { md: "translateX(-50%)" },
                }}
              />
              <Box
                sx={{
                  gridColumn: { md: i % 2 === 0 ? 1 : 2 },
                  textAlign: { md: i % 2 === 0 ? "right" : "left" },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: display,
                    fontWeight: 900,
                    fontSize: { xs: 46, md: 72 },
                    lineHeight: 1,
                    color: "transparent",
                    WebkitTextStroke: "2px var(--maroon-950)",
                  }}
                >
                  {t(m.year)}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: display,
                    fontWeight: 800,
                    fontSize: { xs: 20, md: 26 },
                    mt: 1.5,
                    color: "var(--maroon-950)",
                  }}
                >
                  {t(m.title)}
                </Typography>
                <Typography
                  sx={{
                    mt: 1,
                    opacity: 0.8,
                    lineHeight: 1.7,
                    maxWidth: 440,
                    ml: { md: i % 2 === 0 ? "auto" : 0 },
                  }}
                >
                  {t(m.text)}
                </Typography>
              </Box>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Container>
  );
}

/* ---------- page ---------- */

export default function AboutView() {
  const { t } = useLang();

  return (
    <Box component="main">
      {/* HERO */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          bgcolor: "var(--maroon-950)",
          color: "var(--cream-200)",
          pt: { xs: 14, md: 20 },
          pb: { xs: 8, md: 12 },
        }}
      >
        <Typography
          aria-hidden
          sx={{
            position: "absolute",
            right: { xs: -20, md: 20 },
            bottom: { xs: -30, md: -60 },
            fontFamily: display,
            fontWeight: 900,
            lineHeight: 1,
            fontSize: { xs: 140, md: 320 },
            color: "transparent",
            WebkitTextStroke: "2px var(--gold-400)",
            opacity: 0.35,
            userSelect: "none",
          }}
        >
          1962
        </Typography>

        <Container sx={{ position: "relative" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              sx={{
                color: "var(--gold-400)",
                fontWeight: 800,
                letterSpacing: "0.3em",
                fontSize: 12,
                textTransform: "uppercase",
                mb: 2,
              }}
            >
              {t({ en: "Our heritage", ta: "எங்கள் பாரம்பரியம்" })}
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontFamily: display,
                fontWeight: 900,
                fontSize: { xs: 38, md: 72 },
                lineHeight: 1.05,
                maxWidth: 860,
              }}
            >
              {t({
                en: "Crafting Sweet Traditions Since 1962.",
                ta: "1962 முதல் இனிப்பு பாரம்பரியத்தை உருவாக்கி வருகிறோம்.",
              })}
            </Typography>
            <Typography
              sx={{
                mt: 3,
                maxWidth: 560,
                fontSize: { xs: 16, md: 20 },
                color: "var(--gold-400)",
                fontWeight: 700,
              }}
            >
              {t({
                en: "Three generations of pure taste, unmatched trust.",
                ta: "மூன்று தலைமுறைகளின் தூய சுவை, ஒப்பற்ற நம்பிக்கை.",
              })}
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Marquee />

      {/* STATS */}
      <Container sx={{ py: { xs: 6, md: 9 } }}>
        <Box
          sx={{
            display: "grid",
            gap: { xs: 4, md: 2 },
            gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            textAlign: "center",
          }}
        >
          {stats.map((s, i) => (
            <Box
              key={i}
              sx={{
                borderLeft: {
                  md: i ? "2px solid rgba(43,10,12,0.15)" : "none",
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: display,
                  fontWeight: 900,
                  fontSize: { xs: 44, md: 72 },
                  lineHeight: 1,
                  color: "var(--maroon-950)",
                }}
              >
                <CountUp to={s.to} suffix={s.suffix} />
              </Typography>
              <Typography
                sx={{
                  mt: 1,
                  fontWeight: 800,
                  fontSize: 12,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--maroon-950)",
                  opacity: 0.7,
                }}
              >
                {t(s.label)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* STORY */}
      <Container sx={{ pb: { xs: 4, md: 6 } }}>
        <Box
          sx={{
            display: "grid",
            gap: { xs: 4, md: 8 },
            gridTemplateColumns: { xs: "1fr", md: "1fr 1.4fr" },
            alignItems: "start",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Typography
              sx={{
                fontFamily: display,
                fontWeight: 900,
                fontSize: { xs: 32, md: 52 },
                lineHeight: 1.1,
                color: "var(--maroon-950)",
              }}
            >
              {t({
                en: "A Sweet Journey Since 1962",
                ta: "1962 முதல் ஓர் இனிய பயணம்",
              })}
            </Typography>
          </motion.div>

          <Box sx={{ display: "grid", gap: 3 }}>
            {story.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: 16, md: 18 },
                    lineHeight: 1.8,
                    opacity: 0.85,
                  }}
                >
                  {t(p)}
                </Typography>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Box
                sx={{ pl: 3, py: 1, borderLeft: "6px solid var(--gold-400)" }}
              >
                <Typography
                  sx={{
                    fontFamily: display,
                    fontWeight: 800,
                    fontSize: { xs: 20, md: 26 },
                    lineHeight: 1.35,
                    color: "var(--maroon-950)",
                  }}
                >
                  {t(quote)}
                </Typography>
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Container>

      <Timeline />

      {/* GENERATIONS */}
      <Box sx={{ bgcolor: "var(--gold-400)", py: { xs: 7, md: 10 } }}>
        <Container>
          <Typography
            sx={{
              fontFamily: display,
              fontWeight: 900,
              fontSize: { xs: 28, md: 44 },
              color: "var(--maroon-950)",
              mb: 5,
            }}
          >
            {t({ en: "Three generations", ta: "மூன்று தலைமுறைகள்" })}
          </Typography>

          <Box
            sx={{
              display: "grid",
              gap: 3,
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            }}
          >
            {generations.map((g, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ y: -8 }}
                style={{ display: "flex" }}
              >
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    p: 3.5,
                    borderRadius: "28px",
                    bgcolor: "var(--maroon-950)",
                    color: "var(--cream-200)",
                    boxShadow: "0 10px 30px rgba(43,10,12,0.3)",
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      alignSelf: "flex-start",
                      px: 1.75,
                      py: 0.5,
                      borderRadius: 999,
                      bgcolor: "var(--gold-400)",
                      color: "var(--maroon-950)",
                      fontSize: 12,
                      fontWeight: 900,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                    }}
                  >
                    {t(g.badge)}
                  </Box>

                  <Box sx={{ display: "flex", mt: 3, mb: 2 }}>
                    {g.people.map((p, k) => (
                      <PersonAvatar
                        key={p.initials + k}
                        src={p.image}
                        initials={p.initials}
                        alt={p.name.en}
                        overlap={k > 0}
                      />
                    ))}
                  </Box>

                  {g.people.map((p) => (
                    <Typography
                      key={p.initials}
                      sx={{
                        fontFamily: display,
                        fontWeight: 800,
                        fontSize: 22,
                      }}
                    >
                      {t(p.name)}
                    </Typography>
                  ))}

                  <Typography
                    sx={{
                      mt: 0.75,
                      color: "var(--gold-400)",
                      fontWeight: 800,
                      fontSize: 12,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    {t(g.role)}
                  </Typography>

                  <Typography sx={{ mt: 2, opacity: 0.85, lineHeight: 1.6 }}>
                    {t(g.line)}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA */}
      <Box
        sx={{
          bgcolor: "var(--maroon-950)",
          color: "var(--cream-200)",
          textAlign: "center",
          py: { xs: 7, md: 9 },
        }}
      >
        <Container>
          <Typography
            sx={{
              fontFamily: display,
              fontWeight: 900,
              fontSize: { xs: 28, md: 44 },
              mb: 3,
            }}
          >
            {t({
              en: "Come taste the story.",
              ta: "வந்து சுவைத்துப் பாருங்கள்.",
            })}
          </Typography>
          <Box
            component={Link}
            href="/menu"
            sx={{
              display: "inline-block",
              px: 4,
              py: 1.5,
              borderRadius: 999,
              bgcolor: "var(--gold-400)",
              color: "var(--maroon-950)",
              fontWeight: 900,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              fontSize: 13,
            }}
          >
            {t({ en: "See our menu", ta: "மெனுவைப் பாருங்கள்" })}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
