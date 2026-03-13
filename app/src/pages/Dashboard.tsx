import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import KPICard from "../components/KPICard";
import { formatCurrencyNIO } from "../utils/format";
import { productosMock, ventas7diasMock, ventasPorCategoriaMock } from "../data/mock";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

export default function Dashboard() {
  const ventasHoy = 6100;
  const transacciones = 38;
  const ticketProm = ventasHoy / transacciones;

  const stockCritico = productosMock
    .filter((p) => p.stock <= p.stockMinimo)
    .slice(0, 5);

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
        Dashboard
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <KPICard title="Ventas de hoy" value={formatCurrencyNIO(ventasHoy)} subtitle="Comparado vs ayer (mock)" />
        </Grid>
        <Grid item xs={12} md={4}>
          <KPICard title="Transacciones" value={`${transacciones}`} subtitle="Tickets emitidos hoy (mock)" />
        </Grid>
        <Grid item xs={12} md={4}>
          <KPICard title="Ticket promedio" value={formatCurrencyNIO(ticketProm)} subtitle="Promedio por venta (mock)" />
        </Grid>

        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                Ventas últimos 7 días
              </Typography>
              <Box sx={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ventas7diasMock}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="fecha" />
                    <YAxis />
                    <Tooltip formatter={(v: any) => formatCurrencyNIO(Number(v))} />
                    <Line type="monotone" dataKey="total" stroke="#1e40af" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                Ventas por categoría
              </Typography>
              <Box sx={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ventasPorCategoriaMock}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="categoria" hide />
                    <YAxis />
                    <Tooltip formatter={(v: any) => formatCurrencyNIO(Number(v))} />
                    <Bar dataKey="total" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
              <Typography variant="caption" color="text.secondary">
                Tip: luego lo cambiamos a “Top categorías” por rango de fechas con backend.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                Stock crítico
              </Typography>
              {stockCritico.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No hay productos en stock crítico.
                </Typography>
              ) : (
                <Box component="ul" sx={{ m: 0, pl: 2 }}>
                  {stockCritico.map((p) => (
                    <li key={p.id}>
                      <Typography variant="body2">
                        <b>{p.nombre}</b> — Stock: {p.stock} (mínimo {p.stockMinimo})
                      </Typography>
                    </li>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}