import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#A8171F", dark: "#5C0F14", contrastText: "#FFF1D6" },
    secondary: { main: "#F4B942", contrastText: "#2E0A0C" },
    background: { default: "#FFF7E6", paper: "#FFF8EC" },
    text: { primary: "#2E0A0C", secondary: "#7D1419" },
  },
  typography: {
    fontFamily: "var(--font-montserrat), sans-serif",
    h1: { fontFamily: "var(--font-bodoni), serif", fontWeight: 700 },
    h2: { fontFamily: "var(--font-bodoni), serif", fontWeight: 700 },
    h3: { fontFamily: "var(--font-bodoni), serif", fontWeight: 600 },
    h4: { fontFamily: "var(--font-bodoni), serif", fontWeight: 600 },
  },
  shape: { borderRadius: 4 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          fontWeight: 800,
          borderRadius: 2,
          paddingInline: 28,
        },
      },
    },
  },
});

export default theme;
