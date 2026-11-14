import { Box, Container, Skeleton } from "@mui/material";

const sk = { bgcolor: "rgba(43,10,12,0.08)" };

export default function Loading() {
  return (
    <Box component="main">
      <Box
        sx={{
          bgcolor: "var(--maroon-950)",
          pt: { xs: "120px", md: "150px" },
          pb: { xs: 5, md: 8 },
          borderBottom: "4px solid var(--gold-400)",
        }}
      >
        <Container>
          <Skeleton
            width={120}
            height={20}
            sx={{ bgcolor: "rgba(244,185,66,0.25)" }}
          />
          <Skeleton
            width="55%"
            height={80}
            sx={{ bgcolor: "rgba(255,241,214,0.15)" }}
          />
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
          <Skeleton
            variant="rounded"
            height={560}
            sx={{ ...sk, borderRadius: "28px" }}
          />
          <Skeleton
            variant="rounded"
            height={320}
            sx={{ ...sk, borderRadius: "28px" }}
          />
        </Box>
      </Container>
    </Box>
  );
}
