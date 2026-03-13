import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { useMemo, useState } from "react";
import { useStore } from "../store/useStore";
import { formatCurrencyNIO } from "../utils/format";

export default function Inventario() {
  const productos = useStore((s) => s.productos);
  const [q, setQ] = useState("");

  const filtrados = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return productos;
    return productos.filter(
      (p) =>
        p.nombre.toLowerCase().includes(t) ||
        p.sku.toLowerCase().includes(t) ||
        p.categoria.toLowerCase().includes(t)
    );
  }, [q, productos]);

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
        Inventario
      </Typography>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <TextField
            fullWidth
            label="Buscar por nombre, SKU o categoría"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </CardContent>
      </Card>

      <Grid container spacing={2}>
        {filtrados.map((p) => {
          const critico = p.stock <= p.stockMinimo;
          return (
            <Grid key={p.id} item xs={12} md={6} lg={4}>
              <Card variant="outlined">
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
                    <Box>
                      <Typography sx={{ fontWeight: 800 }}>{p.nombre}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {p.sku} · {p.categoria}
                      </Typography>
                    </Box>

                    <Chip
                      size="small"
                      color={critico ? "error" : "success"}
                      label={critico ? "Stock bajo" : "OK"}
                    />
                  </Box>

                  <Box sx={{ mt: 1.25 }}>
                    <Typography variant="body2">
                      <b>Precio:</b> {formatCurrencyNIO(p.precio)}
                    </Typography>
                    <Typography variant="body2">
                      <b>Stock:</b> {p.stock} {p.unidad} (mín {p.stockMinimo})
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Estado: {p.activo ? "Activo" : "Descontinuado"}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}