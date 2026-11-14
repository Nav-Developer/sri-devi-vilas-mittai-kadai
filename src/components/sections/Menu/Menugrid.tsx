"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Box, Tooltip, Typography } from "@mui/material";
import assets from "@/assets";
import { useLang } from "@/il8n/LanguageProvider";
import { urlFor } from "@/sanity/lib/image";

export type MenuItem = {
  _id: string;
  nameEn: string;
  nameTa?: string;
  descEn?: string;
  descTa?: string;
  category?: string;
  price: number;
  unit?: string;
  available?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
};

const CATEGORY_LABEL: Record<string, { en: string; ta: string }> = {
  sweets: { en: "Sweets", ta: "இனிப்புகள்" },
  savouries: { en: "Savouries", ta: "காரங்கள்" },
  cakes: { en: "Cakes", ta: "கேக்குகள்" },
  drinks: { en: "Drinks", ta: "பானங்கள்" },
};

const nameFont = "var(--font-bodoni), var(--font-tamil), serif";
const LOGO_SRC = assets.images.logo;

/** Logo in the middle of a cream tile. Pulses while an image is loading. */
function LogoLoader({ pulse }: { pulse: boolean }) {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center",
        bgcolor: "var(--cream-200)",
      }}
    >
      <motion.div
        animate={
          pulse ? { scale: [1, 1.08, 1], opacity: [0.65, 1, 0.65] } : undefined
        }
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "relative",
          width: "46%",
          aspectRatio: "1 / 1",
          borderRadius: "50%",
          overflow: "hidden",
          border: "3px solid var(--gold-400)",
          background: "#fff",
          opacity: pulse ? undefined : 0.8,
        }}
      >
        <Image
          src={LOGO_SRC}
          alt=""
          fill
          sizes="160px"
          style={{ objectFit: "contain" }}
        />
      </motion.div>
    </Box>
  );
}

function MenuImage({
  image,
  name,
  soldOut,
  eager,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
  name: string;
  soldOut: boolean;
  eager: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // image may already be cached before React attaches onLoad
  useEffect(() => {
    const el = ref.current;
    if (el?.complete && el.naturalWidth > 0) setLoaded(true);
  }, []);

  if (failed) return <LogoLoader pulse={false} />;

  return (
    <>
      {!loaded && <LogoLoader pulse />}
      <Box
        ref={ref}
        className="menu-img"
        component="img"
        src={urlFor(image)
          .width(560)
          .height(560)
          .fit("crop")
          .auto("format")
          .quality(80)
          .url()}
        alt={name}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        sx={{
          position: "relative",
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform .5s ease, opacity .4s ease",
          opacity: loaded ? (soldOut ? 0.55 : 1) : 0,
        }}
      />
    </>
  );
}

export default function MenuGrid({ items }: { items: MenuItem[] }) {
  const { t } = useLang();
  const [active, setActive] = useState<string>("all");

  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => i.category && set.add(i.category));
    return Array.from(set);
  }, [items]);

  const visible =
    active === "all" ? items : items.filter((i) => i.category === active);

  const chip = (key: string, label: { en: string; ta: string }) => (
    <Box
      key={key}
      component="button"
      type="button"
      onClick={() => setActive(key)}
      sx={{
        cursor: "pointer",
        px: 2.5,
        py: 1,
        borderRadius: 999,
        border: "2px solid var(--gold-400)",
        bgcolor: active === key ? "var(--gold-400)" : "transparent",
        color: active === key ? "var(--maroon-950)" : "var(--gold-400)",
        fontWeight: 800,
        fontSize: 13,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        transition: "all .2s ease",
        "&:hover": { bgcolor: "var(--gold-400)", color: "var(--maroon-950)" },
      }}
    >
      {t(label)}
    </Box>
  );

  return (
    <>
      <Typography variant="h2" sx={{ fontWeight: 900, mb: 3 }}>
        {t({ en: "Menu", ta: "மெனு" })}
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 5 }}>
        {chip("all", { en: "All", ta: "அனைத்தும்" })}
        {categories.map((c) => chip(c, CATEGORY_LABEL[c] ?? { en: c, ta: c }))}
      </Box>

      {visible.length === 0 && (
        <Typography sx={{ opacity: 0.7 }}>
          {t({ en: "No items yet.", ta: "இன்னும் பொருட்கள் இல்லை." })}
        </Typography>
      )}

      <Box
        sx={{
          display: "grid",
          gap: { xs: 2.5, md: 4 },
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(auto-fill, minmax(250px, 1fr))",
          },
        }}
      >
        {visible.map((item, i) => {
          const name = t({ en: item.nameEn, ta: item.nameTa || item.nameEn });
          const desc = t({
            en: item.descEn ?? "",
            ta: item.descTa || item.descEn || "",
          });
          const soldOut = item.available === false;
          const category = item.category
            ? CATEGORY_LABEL[item.category]
            : undefined;

          return (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
            >
              {/* Wrapper stays still and owns the hover, so no flicker */}
              <Box
                sx={{
                  "&:hover .menu-card": { transform: "translateY(-6px)" },
                  "&:hover .menu-img": { transform: "scale(1.07)" },
                }}
              >
                <Box
                  className="menu-card"
                  sx={{ transition: "transform .3s ease" }}
                >
                  {/* Photo */}
                  <Box
                    sx={{
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: "28px",
                      aspectRatio: "1 / 1",
                      bgcolor: "var(--cream-200)",
                      boxShadow: "0 10px 30px rgba(43,10,12,0.12)",
                    }}
                  >
                    {item.image ? (
                      <MenuImage
                        image={item.image}
                        name={name}
                        soldOut={soldOut}
                        eager={i < 4}
                      />
                    ) : (
                      <LogoLoader pulse={false} />
                    )}

                    {/* Category tag */}
                    {category && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 14,
                          left: 14,
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1,
                          bgcolor: "var(--maroon-950)",
                          color: "var(--gold-400)",
                          fontSize: 11,
                          fontWeight: 800,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          zIndex: 1,
                        }}
                      >
                        {t(category)}
                      </Box>
                    )}

                    {/* Sold out badge */}
                    {soldOut && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: 84,
                          height: 84,
                          borderRadius: "50%",
                          bgcolor: "var(--gold-400)",
                          color: "var(--maroon-950)",
                          display: "grid",
                          placeItems: "center",
                          textAlign: "center",
                          fontWeight: 900,
                          fontSize: 13,
                          lineHeight: 1.1,
                          zIndex: 1,
                        }}
                      >
                        {t({ en: "SOLD OUT", ta: "இருப்பு இல்லை" })}
                      </Box>
                    )}

                    {/* Description tooltip */}
                    {desc && (
                      <Tooltip
                        title={desc}
                        arrow
                        placement="top"
                        enterTouchDelay={0}
                        leaveTouchDelay={5000}
                        slotProps={{
                          tooltip: {
                            sx: {
                              bgcolor: "var(--maroon-950)",
                              color: "var(--cream-200)",
                              fontSize: 13,
                              lineHeight: 1.5,
                              p: 1.5,
                              borderRadius: 2,
                              maxWidth: 260,
                            },
                          },
                          arrow: { sx: { color: "var(--maroon-950)" } },
                        }}
                      >
                        <Box
                          component="button"
                          type="button"
                          aria-label={t({
                            en: "About this item",
                            ta: "விவரம்",
                          })}
                          sx={{
                            position: "absolute",
                            right: 14,
                            bottom: 14,
                            width: 34,
                            height: 34,
                            borderRadius: "50%",
                            border: "2px solid var(--gold-400)",
                            bgcolor: "var(--maroon-950)",
                            color: "var(--gold-400)",
                            fontWeight: 900,
                            fontStyle: "italic",
                            fontFamily: "serif",
                            fontSize: 18,
                            cursor: "help",
                            display: "grid",
                            placeItems: "center",
                            zIndex: 1,
                          }}
                        >
                          i
                        </Box>
                      </Tooltip>
                    )}
                  </Box>

                  {/* Details */}
                  <Box sx={{ px: 0.5, pt: 2 }}>
                    <Typography
                      sx={{
                        fontFamily: nameFont,
                        fontWeight: 700,
                        fontSize: { xs: 18, md: 22 },
                        lineHeight: 1.25,
                      }}
                    >
                      {name}
                    </Typography>
                    <Typography sx={{ fontWeight: 800, mt: 0.5, fontSize: 17 }}>
                      ₹{item.price}
                    </Typography>

                    {item.unit && (
                      <>
                        <Box
                          sx={{
                            height: "1px",
                            bgcolor: "rgba(43,10,12,0.18)",
                            my: 1.5,
                          }}
                        />
                        <Box
                          component="span"
                          sx={{
                            display: "inline-block",
                            px: 2,
                            py: 0.75,
                            borderRadius: 999,
                            bgcolor: "var(--maroon-950)",
                            color: "var(--cream-200)",
                            fontWeight: 800,
                            fontSize: 13,
                            textTransform: "uppercase",
                          }}
                        >
                          {item.unit}
                        </Box>
                      </>
                    )}
                  </Box>
                </Box>
              </Box>
            </motion.div>
          );
        })}
      </Box>
    </>
  );
}
