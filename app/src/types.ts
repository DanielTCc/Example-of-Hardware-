export type Categoria =
  | "Tornillería"
  | "Eléctrico"
  | "Plomería"
  | "Pinturas"
  | "Herramientas"
  | "Otros";

export type Unidad = "unidad" | "metro" | "yarda" | "libra" | "galón" | "caja";

export type Producto = {
  id: string;
  sku: string;
  nombre: string;
  categoria: Categoria;
  unidad: Unidad;
  costo: number;
  precio: number;
  stock: number;
  stockMinimo: number;
  activo: boolean;
};

export type LineaCarrito = {
  productoId: string;
  nombre: string;
  precio: number;
  cantidad: number;
  descuento: number; // C$ por línea
};

export type MetodoPago = "Efectivo" | "Transferencia" | "Tarjeta" | "Mixto";