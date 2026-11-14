"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  Checkbox,
  Container,
  IconButton,
  ListItemText,
  MenuItem,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import { useLang } from "@/il8n/LanguageProvider";
import { EMAIL } from "@/data/branchlist";

export type ContactItem = {
  _id: string;
  nameEn: string;
  nameTa?: string;
  price: number;
  unit?: string;
};

export type ContactBranch = {
  _id: string;
  town: string;
  addressEn?: string;
  addressTa?: string;
};

type Channel = "whatsapp" | "email";
type Line = { id: string; qty: number };

const display = "var(--font-bodoni), var(--font-tamil), serif";

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    bgcolor: "#fff",
    borderRadius: 3,
    "& fieldset": { borderColor: "rgba(43,10,12,0.25)" },
    "&:hover fieldset": { borderColor: "var(--maroon-950)" },
    "&.Mui-focused fieldset": { borderColor: "var(--maroon-950)" },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "var(--maroon-950)" },
};

const qtyBtn = {
  color: "var(--maroon-950)",
  border: "2px solid var(--maroon-950)",
};

function Qty({
  qty,
  onChange,
}: {
  qty: number;
  onChange: (n: number) => void;
}) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
      <IconButton
        size="small"
        aria-label="decrease"
        onClick={() => onChange(qty - 1)}
        sx={qtyBtn}
      >
        <RemoveIcon fontSize="small" />
      </IconButton>
      <TextField
        value={qty}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        size="small"
        slotProps={{
          htmlInput: {
            inputMode: "numeric",
            style: {
              textAlign: "center",
              fontWeight: 800,
              width: 40,
              padding: "6px 4px",
            },
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": { bgcolor: "#fff", borderRadius: 2 },
        }}
      />
      <IconButton
        size="small"
        aria-label="increase"
        onClick={() => onChange(qty + 1)}
        sx={qtyBtn}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

export default function ContactForm({
  items,
  branches,
  phones,
  whatsapp,
}: {
  items: ContactItem[];
  branches: ContactBranch[];
  phones: string[];
  whatsapp: string;
}) {
  const { t } = useLang();
  const [channel, setChannel] = useState<Channel>("whatsapp");
  const [name, setName] = useState("");
  const [lines, setLines] = useState<Line[]>([]);
  const [message, setMessage] = useState("");

  const label = (i: ContactItem) =>
    t({ en: i.nameEn, ta: i.nameTa || i.nameEn });
  const byId = (id: string) => items.find((i) => i._id === id);

  const chosen = lines
    .map((l) => ({ ...l, item: byId(l.id) }))
    .filter((l): l is Line & { item: ContactItem } => !!l.item);
  const total = chosen.reduce((s, l) => s + l.item.price * l.qty, 0);
  const canSend =
    name.trim() !== "" && (message.trim() !== "" || chosen.length > 0);
  const isWA = channel === "whatsapp";

  const handlePick = (ids: string[]) =>
    setLines(ids.map((id) => lines.find((l) => l.id === id) ?? { id, qty: 1 }));
  const setQty = (id: string, n: number) =>
    setLines((ls) =>
      ls.map((l) =>
        l.id === id ? { ...l, qty: Math.max(1, Math.min(999, n || 1)) } : l,
      ),
    );
  const remove = (id: string) =>
    setLines((ls) => ls.filter((l) => l.id !== id));

  const handleSend = () => {
    if (!canSend) return;

    const out = [`Hi Sri Devi Vilas Mittai Kadai,`, ``, `Name: ${name.trim()}`];
    if (chosen.length) {
      out.push(``, `Order:`);
      chosen.forEach((l, i) =>
        out.push(
          `${i + 1}. ${l.item.nameEn} x ${l.qty}${
            l.item.unit ? ` (${l.item.unit} each)` : ""
          } - ₹${l.item.price * l.qty}`,
        ),
      );
      out.push(`Estimated total: ₹${total}`);
    }
    if (message.trim()) out.push(``, message.trim());
    const text = out.join("\n");

    if (isWA) {
      window.open(
        `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`,
        "_blank",
        "noopener,noreferrer",
      );
    } else {
      const subject = chosen.length
        ? `Enquiry: ${chosen.length} item${chosen.length > 1 ? "s" : ""}`
        : "Enquiry";
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(text)}`;
    }
  };

  return (
    <Box component="main">
      {/* HEADER */}
      <Box
        sx={{
          bgcolor: "var(--maroon-950)",
          color: "var(--cream-200)",
          pt: { xs: "120px", md: "150px" },
          pb: { xs: 5, md: 8 },
          borderBottom: "4px solid var(--gold-400)",
        }}
      >
        <Container>
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
            {t({ en: "Contact", ta: "தொடர்பு" })}
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontFamily: display,
              fontWeight: 900,
              fontSize: { xs: 38, md: 68 },
              lineHeight: 1.05,
            }}
          >
            {t({ en: "Let's talk sweets.", ta: "இனிப்பு பேசலாம்." })}
          </Typography>
        </Container>
      </Box>

      <Container sx={{ py: { xs: 6, md: 9 } }}>
        <Box
          sx={{
            display: "grid",
            gap: { xs: 4, md: 6 },
            gridTemplateColumns: { xs: "1fr", md: "1.25fr 1fr" },
          }}
        >
          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                p: { xs: 2.5, md: 4 },
                borderRadius: "28px",
                bgcolor: "var(--cream-200)",
                border: "2px solid var(--gold-400)",
                boxShadow: "0 10px 30px rgba(43,10,12,0.12)",
                display: "grid",
                gap: 2.5,
              }}
            >
              <ToggleButtonGroup
                exclusive
                fullWidth
                value={channel}
                onChange={(_, v: Channel | null) => v && setChannel(v)}
                sx={{
                  "& .MuiToggleButton-root": {
                    borderRadius: 999,
                    border: "2px solid var(--maroon-950)",
                    color: "var(--maroon-950)",
                    fontWeight: 800,
                    gap: 1,
                    py: 1,
                  },
                  "& .MuiToggleButton-root.Mui-selected, & .MuiToggleButton-root.Mui-selected:hover":
                    {
                      bgcolor: "var(--maroon-950)",
                      color: "var(--gold-400)",
                    },
                }}
              >
                <ToggleButton value="whatsapp">
                  <WhatsAppIcon fontSize="small" /> WhatsApp
                </ToggleButton>
                <ToggleButton value="email">
                  <EmailIcon fontSize="small" /> Email
                </ToggleButton>
              </ToggleButtonGroup>

              <TextField
                label={t({ en: "Your name", ta: "உங்கள் பெயர்" })}
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                sx={fieldSx}
              />

              {items.length > 0 && (
                <TextField
                  select
                  label={t({
                    en: "Items (optional)",
                    ta: "பொருட்கள் (விருப்பம்)",
                  })}
                  value={lines.map((l) => l.id)}
                  onChange={(e) => {
                    const v = e.target.value as unknown as string | string[];
                    handlePick(typeof v === "string" ? v.split(",") : v);
                  }}
                  fullWidth
                  sx={fieldSx}
                  slotProps={{
                    inputLabel: { shrink: true },
                    select: {
                      multiple: true,
                      displayEmpty: true,
                      renderValue: (sel: unknown) => {
                        const ids = sel as string[];
                        if (!ids.length)
                          return (
                            <span style={{ opacity: 0.6 }}>
                              {t({
                                en: "Select one or more items",
                                ta: "ஒன்று அல்லது அதற்கு மேற்பட்ட பொருட்கள்",
                              })}
                            </span>
                          );
                        return ids
                          .map((id) => byId(id))
                          .filter((i): i is ContactItem => !!i)
                          .map(label)
                          .join(", ");
                      },
                      MenuProps: {
                        slotProps: { paper: { sx: { maxHeight: 360 } } },
                      },
                    },
                  }}
                >
                  {items.map((i) => (
                    <MenuItem key={i._id} value={i._id}>
                      <Checkbox
                        checked={lines.some((l) => l.id === i._id)}
                        sx={{
                          color: "var(--maroon-950)",
                          "&.Mui-checked": { color: "var(--maroon-950)" },
                        }}
                      />
                      <ListItemText
                        primary={label(i)}
                        secondary={`₹${i.price}${i.unit ? ` / ${i.unit}` : ""}`}
                      />
                    </MenuItem>
                  ))}
                </TextField>
              )}

              {chosen.map((l) => (
                <Box
                  key={l.id}
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1.5,
                    p: 1.5,
                    pl: 2,
                    borderRadius: 3,
                    bgcolor: "#fff",
                    border: "2px solid rgba(43,10,12,0.15)",
                  }}
                >
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontFamily: display,
                        fontWeight: 800,
                        fontSize: 17,
                      }}
                    >
                      {label(l.item)}
                    </Typography>
                    <Typography
                      sx={{ fontWeight: 700, fontSize: 13, opacity: 0.75 }}
                    >
                      ₹{l.item.price}
                      {l.item.unit ? ` / ${l.item.unit}` : ""}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Qty qty={l.qty} onChange={(n) => setQty(l.id, n)} />
                    <IconButton
                      size="small"
                      aria-label="remove"
                      onClick={() => remove(l.id)}
                      sx={{ color: "var(--maroon-950)" }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              ))}

              {/* total inside the card on mobile only (desktop has the side panel) */}
              {chosen.length > 0 && (
                <Typography
                  sx={{
                    display: { md: "none" },
                    textAlign: "right",
                    fontWeight: 900,
                    color: "var(--maroon-950)",
                  }}
                >
                  {t({ en: "Estimated total", ta: "மொத்தம் (தோராயமாக)" })}: ₹
                  {total}
                </Typography>
              )}

              <TextField
                label={t({ en: "Message", ta: "செய்தி" })}
                placeholder={t({
                  en: "Occasion, pickup date, special requests...",
                  ta: "விழா, எடுக்கும் தேதி, சிறப்பு கோரிக்கைகள்...",
                })}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                multiline
                rows={4}
                fullWidth
                sx={fieldSx}
                slotProps={{ inputLabel: { shrink: true } }}
              />

              <Button
                onClick={handleSend}
                disabled={!canSend}
                startIcon={isWA ? <WhatsAppIcon /> : <EmailIcon />}
                sx={{
                  py: 1.5,
                  borderRadius: 999,
                  bgcolor: "var(--maroon-950)",
                  color: "var(--gold-400)",
                  fontWeight: 900,
                  letterSpacing: "0.12em",
                  "&:hover": { bgcolor: "var(--maroon-950)", opacity: 0.9 },
                  "&.Mui-disabled": {
                    bgcolor: "rgba(43,10,12,0.25)",
                    color: "#fff",
                  },
                }}
              >
                {isWA
                  ? t({ en: "Send on WhatsApp", ta: "வாட்ஸ்அப்பில் அனுப்பு" })
                  : t({ en: "Send by Email", ta: "மின்னஞ்சலில் அனுப்பு" })}
              </Button>
            </Box>
          </motion.div>

          {/* SIDE: order summary (sticky on desktop) + shop info */}
          <Box sx={{ display: "grid", gap: 3, alignContent: "start" }}>
            <Box
              sx={{
                position: { md: "sticky" },
                top: { md: 130 },
                p: 3,
                borderRadius: "28px",
                bgcolor: "var(--maroon-950)",
                color: "var(--cream-200)",
                border: "2px solid var(--gold-400)",
                boxShadow: "0 10px 30px rgba(43,10,12,0.25)",
              }}
            >
              <Typography
                sx={{
                  fontFamily: display,
                  fontWeight: 900,
                  fontSize: 26,
                  color: "var(--gold-400)",
                  mb: 2,
                }}
              >
                {t({ en: "Your order", ta: "உங்கள் ஆர்டர்" })}
              </Typography>

              {chosen.length === 0 ? (
                <Typography sx={{ opacity: 0.75 }}>
                  {t({
                    en: "Pick items from the list and they'll show up here. Or just send a message.",
                    ta: "பட்டியலில் இருந்து பொருட்களைத் தேர்வு செய்யுங்கள், இங்கே தெரியும். அல்லது செய்தி மட்டும் அனுப்புங்கள்.",
                  })}
                </Typography>
              ) : (
                <>
                  {chosen.map((l) => (
                    <Box
                      key={l.id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 2,
                        py: 1,
                        borderBottom: "1px solid rgba(255,241,214,0.15)",
                      }}
                    >
                      <Typography sx={{ fontWeight: 700 }}>
                        {label(l.item)}{" "}
                        <Box component="span" sx={{ color: "var(--gold-400)" }}>
                          × {l.qty}
                        </Box>
                      </Typography>
                      <Typography sx={{ fontWeight: 800 }}>
                        ₹{l.item.price * l.qty}
                      </Typography>
                    </Box>
                  ))}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      mt: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontWeight: 800,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                      }}
                    >
                      {t({ en: "Estimated total", ta: "மொத்தம்" })}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: display,
                        fontWeight: 900,
                        fontSize: 36,
                        color: "var(--gold-400)",
                      }}
                    >
                      ₹{total}
                    </Typography>
                  </Box>
                </>
              )}
            </Box>

            {phones.length > 0 && (
              <Box>
                <Typography
                  sx={{
                    fontWeight: 800,
                    letterSpacing: "0.2em",
                    fontSize: 12,
                    textTransform: "uppercase",
                    color: "var(--maroon-950)",
                    mb: 1,
                  }}
                >
                  {t({ en: "Call us", ta: "அழைக்க" })}
                </Typography>
                {phones.map((p) => (
                  <Typography
                    key={p}
                    component="a"
                    href={`tel:${p}`}
                    sx={{
                      display: "block",
                      fontFamily: display,
                      fontWeight: 800,
                      fontSize: 26,
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    {p}
                  </Typography>
                ))}
              </Box>
            )}

            {branches.map((b) => (
              <Box
                key={b._id}
                sx={{
                  p: 2.5,
                  borderRadius: "20px",
                  bgcolor: "var(--maroon-950)",
                  color: "var(--cream-200)",
                  borderLeft: "6px solid var(--gold-400)",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: display,
                    fontWeight: 800,
                    fontSize: 22,
                    color: "var(--gold-400)",
                  }}
                >
                  {b.town}
                </Typography>
                <Typography sx={{ opacity: 0.85, mt: 0.5 }}>
                  {t({
                    en: b.addressEn ?? "",
                    ta: b.addressTa || b.addressEn || "",
                  })}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
