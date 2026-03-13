import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMemo, useState } from "react";
import { useStore } from "../store/useStore";
import { formatCurrencyNIO } from "../utils/format";
import type { MetodoPago } from "../types";

export default function POS() {
  const productos = useStore((s) => s.productos);
  const carrito = useStore((s) => s.carrito);
  const metodoPago = useStore((s) => s.metodoPago);
  const efectivoRecibido = useStore((s) => s.efectivoRecibido);

  const agregarProducto = useStore((s) => s.agregarProducto);
  const cambiarCantidad = useStore((s) => s.cambiarCantidad);
  const quitarProducto = useStore((s) => s.quitarProducto);
  const vaciarCarrito = useStore((s) => s.vaciarCarrito);
  const setMetodoPago = useStore((s) => s.setMetodoPago);
  const setEfectivoRecibido = useStore((s) => s.setEfectivoRecibido);

  const [q, setQ] = useState("");

  const productosFiltrados = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return productos;
    return productos.filter(
      (p) =>
        p.nombre.toLowerCase().includes(t) ||
        p.sku.toLowerCase().includes(t)
    );
  }, [productos, q]);

  const subtotal = carrito.reduce((acc, l) => acc + l.precio * l.cantidad - l.descuento, 0);
  const ivaRate = 0.15; // ajustable
  const iva = subtotal * ivaRate;
  const total = subtotal + iva;

  const vuelto = metodoPago === "Efectivo" ? Math.max(0, efectivoRecibido - total) : 0;

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
        POS / Caja
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                Buscar producto
              </Typography>
              <TextField
                fullWidth
                label="Nombre o SKU"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </CardContent>
          </Card>

          <Grid container spacing={2}>
            {productosFiltrados.map((p) => (
              <Grid key={p.id} item xs={12} sm={6} lg={4}>
                <Card variant="outlined" sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography sx={{ fontWeight: 700 }}>{p.nombre}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {p.sku} · {p.categoria}
                    </Typography>
                    <Typography sx={{ mt: 1, fontWeight: 800 }}>
                      {formatCurrencyNIO(p.precio)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Stock: {p.stock} {p.unidad}
                    </Typography>

                    <Button
                      sx={{ mt: 2 }}
                      fullWidth
                      variant="contained"
                      onClick={() => agregarProducto(p.id)}
                      disabled={!p.activo}
                    >
                      Agregar
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Carrito
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Demo sin base de datos (mock)
              </Typography>

              <Divider sx={{ my: 2 }} />

              {carrito.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No hay productos en el carrito.
                </Typography>
              ) : (
                <Stack spacing={1.25}>
                  {carrito.map((l) => (
                    <Box key={l.productoId} sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontWeight: 700 }}>{l.nombre}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatCurrencyNIO(l.precio)} c/u
                        </Typography>
                      </Box>

                      <IconButton onClick={() => cambiarCantidad(l.productoId, l.cantidad - 1)}>
                        <RemoveIcon />
                      </IconButton>
                      <Typography sx={{ width: 22, textAlign: "center", fontVariantNumeric: "tabular-nums" }}>
                        {l.cantidad}
                      </Typography>
                      <IconButton onClick={() => cambiarCantidad(l.productoId, l.cantidad + 1)}>
                        <AddIcon />
                      </IconButton>

                      <IconButton color="error" onClick={() => quitarProducto(l.productoId)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                </Stack>
              )}

              <Divider sx={{ my: 2 }} />

              <Stack spacing={0.75}>
                <Row label="Subtotal" value={formatCurrencyNIO(subtotal)} />
                <Row label="IVA (15%)" value={formatCurrencyNIO(iva)} />
                <Row label="Total" value={formatCurrencyNIO(total)} strong />
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                Pago
              </Typography>

              <Stack spacing={1.25}>
                <Select
                  value={metodoPago}
                  onChange={(e) => setMetodoPago(e.target.value as MetodoPago)}
                >
                  <MenuItem value="Efectivo">Efectivo</MenuItem>
                  <MenuItem value="Transferencia">Transferencia</MenuItem>
                  <MenuItem value="Tarjeta">Tarjeta</MenuItem>
                  <MenuItem value="Mixto">Mixto</MenuItem>
                </Select>

                {metodoPago === "Efectivo" ? (
                  <TextField
                    label="Efectivo recibido"
                    type="number"
                    value={efectivoRecibido}
                    onChange={(e) => setEfectivoRecibido(Number(e.target.value))}
                  />
                ) : null}

                {metodoPago === "Efectivo" ? (
                  <Row label="Vuelto" value={formatCurrencyNIO(vuelto)} />
                ) : null}

                <Button
                  variant="contained"
                  size="large"
                  disabled={carrito.length === 0}
                  onClick={() => {
                    alert("Venta realizada (demo). Luego conectamos backend e impresión de ticket.");
                    vaciarCarrito();
                  }}
                >
                  Cobrar
                </Button>

                <Button
                  variant="outlined"
                  color="inherit"
                  disabled={carrito.length === 0}
                  onClick={() => vaciarCarrito()}
                >
                  Cancelar venta
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

function Row(props: { label: string; value: string; strong?: boolean }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
      <Typography variant="body2" color="text.secondary">
        {props.label}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: props.strong ? 800 : 600, fontVariantNumeric: "tabular-nums" }}>
        {props.value}
      </Typography>
    </Box>
  );
}