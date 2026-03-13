import type { Producto } from "../types";

export const productosMock: Producto[] = [
  {
    id: "p1",
    sku: "HERR-0001",
    nombre: "Martillo carpintero 16oz",
    categoria: "Herramientas",
    unidad: "unidad",
    costo: 85,
    precio: 120,
    stock: 24,
    stockMinimo: 8,
    activo: true
  },
  {
    id: "p2",
    sku: "TORN-0132",
    nombre: "Caja de clavos 2”",
    categoria: "Tornillería",
    unidad: "caja",
    costo: 30,
    precio: 45,
    stock: 58,
    stockMinimo: 15,
    activo: true
  },
  {
    id: "p3",
    sku: "HERR-0042",
    nombre: "Cinta métrica 5m",
    categoria: "Herramientas",
    unidad: "unidad",
    costo: 55,
    precio: 80,
    stock: 15,
    stockMinimo: 6,
    activo: true
  },
  {
    id: "p4",
    sku: "PLOM-0210",
    nombre: "Tubo PVC 1/2” (1m)",
    categoria: "Plomería",
    unidad: "metro",
    costo: 30,
    precio: 55,
    stock: 5,
    stockMinimo: 10,
    activo: true
  },
  {
    id: "p5",
    sku: "ELEC-0303",
    nombre: "Cinta aislante 3/4”",
    categoria: "Eléctrico",
    unidad: "unidad",
    costo: 18,
    precio: 30,
    stock: 9,
    stockMinimo: 10,
    activo: true
  }
];

export const ventas7diasMock = [
  { fecha: "Lun", total: 2800 },
  { fecha: "Mar", total: 4100 },
  { fecha: "Mié", total: 3650 },
  { fecha: "Jue", total: 5200 },
  { fecha: "Vie", total: 6100 },
  { fecha: "Sáb", total: 7200 },
  { fecha: "Dom", total: 2500 }
];

export const ventasPorCategoriaMock = [
  { categoria: "Herramientas", total: 14500 },
  { categoria: "Tornillería", total: 9200 },
  { categoria: "Eléctrico", total: 6800 },
  { categoria: "Plomería", total: 5300 },
  { categoria: "Pinturas", total: 3100 }
];