import { Box, Container, Skeleton } from "@mui/material";

const sk = { bgcolor: "rgba(43,10,12,0.08)" };

export default function Loading() {
  return (
    <Container sx={{ pt: 14, pb: 8 }}>
      <Skeleton variant="text" width={180} height={70} sx={sk} />
      <Box sx={{ display: "flex", gap: 1.5, mb: 5 }}>
        {[90, 110, 130, 100].map((w) => (
          <Skeleton
            key={w}
            variant="rounded"
            width={w}
            height={40}
            sx={{ ...sk, borderRadius: 999 }}
          />
        ))}
      </Box>
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
        {Array.from({ length: 8 }).map((_, i) => (
          <Box key={i}>
            <Skeleton
              variant="rounded"
              sx={{
                ...sk,
                aspectRatio: "1 / 1",
                height: "auto",
                borderRadius: "28px",
              }}
            />
            <Skeleton variant="text" width="70%" height={32} sx={sk} />
            <Skeleton variant="text" width="30%" height={28} sx={sk} />
          </Box>
        ))}
      </Box>
    </Container>
  );
}
