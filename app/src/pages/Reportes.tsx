import { Box, Card, CardContent, Typography } from "@mui/material";

export default function Reportes() {
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
        Reportes
      </Typography>

      <Card>
        <CardContent>
          <Typography sx={{ fontWeight: 700 }}>Próximamente</Typography>
          <Typography variant="body2" color="text.secondary">
            Aquí agregamos reportes por rango de fechas, exportación a Excel/PDF y cierre de caja.
            Por ahora es UI demo.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}