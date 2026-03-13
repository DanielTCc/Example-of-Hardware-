import { create } from "zustand";
import type { LineaCarrito, MetodoPago, Producto } from "../types";
import { productosMock } from "../data/mock";

type State = {
  productos: Producto[];
  carrito: LineaCarrito[];
  metodoPago: MetodoPago;
  efectivoRecibido: number;

  setMetodoPago: (m: MetodoPago) => void;
  setEfectivoRecibido: (v: number) => void;

  agregarProducto: (productoId: string) => void;
  cambiarCantidad: (productoId: string, cantidad: number) => void;
  quitarProducto: (productoId: string) => void;
  vaciarCarrito: () => void;
};

export const useStore = create<State>((set, get) => ({
  productos: productosMock,
  carrito: [],
  metodoPago: "Efectivo",
  efectivoRecibido: 0,

  setMetodoPago: (m) => set({ metodoPago: m }),
  setEfectivoRecibido: (v) => set({ efectivoRecibido: v }),

  agregarProducto: (productoId) => {
    const producto = get().productos.find((p) => p.id === productoId);
    if (!producto) return;

    const carrito = [...get().carrito];
    const idx = carrito.findIndex((l) => l.productoId === productoId);

    if (idx >= 0) {
      carrito[idx] = { ...carrito[idx], cantidad: carrito[idx].cantidad + 1 };
    } else {
      carrito.push({
        productoId,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1,
        descuento: 0
      });
    }

    set({ carrito });
  },

  cambiarCantidad: (productoId, cantidad) => {
    const carrito = get().carrito
      .map((l) => (l.productoId === productoId ? { ...l, cantidad } : l))
      .filter((l) => l.cantidad > 0);
    set({ carrito });
  },

  quitarProducto: (productoId) => {
    set({ carrito: get().carrito.filter((l) => l.productoId !== productoId) });
  },

  vaciarCarrito: () => set({ carrito: [], efectivoRecibido: 0 })
}));