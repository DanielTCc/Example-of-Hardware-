import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import BarChartIcon from "@mui/icons-material/BarChart";

const drawerWidth = 260;

const items = [
  { label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
  { label: "POS / Caja", path: "/pos", icon: <PointOfSaleIcon /> },
  { label: "Inventario", path: "/inventario", icon: <Inventory2Icon /> },
  { label: "Reportes", path: "/reportes", icon: <BarChartIcon /> }
];

export default function Layout() {
  const nav = useNavigate();
  const { pathname } = useLocation();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
        <Toolbar>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" sx={{ lineHeight: 1.1 }}>
              Ferretería Mi Casa
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              POS e Inventario · Moneda C$ · Demo sin base de datos
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" }
        }}
      >
        <Toolbar />
        <Box sx={{ p: 1 }}>
          <Typography variant="overline" sx={{ px: 1, color: "text.secondary" }}>
            Operaciones
          </Typography>
          <List dense>
            {items.map((it) => (
              <ListItemButton
                key={it.path}
                selected={pathname === it.path}
                onClick={() => nav(it.path)}
                sx={{ borderRadius: 2, mx: 0.5, my: 0.5 }}
              >
                <ListItemIcon sx={{ minWidth: 38 }}>{it.icon}</ListItemIcon>
                <ListItemText primary={it.label} />
              </ListItemButton>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />
          <Typography variant="caption" sx={{ px: 1, color: "text.secondary" }}>
            Caja 01 · Usuario: Daniel
          </Typography>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flex: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}