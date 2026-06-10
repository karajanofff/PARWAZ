import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import StationsPage from "./pages/StationsPage";
import StationDetailsPage from "./pages/StationDetailsPage";
import KpiPage from "./pages/KpiPage";
import MapPage from "./pages/MapPage";
import AlarmsPage from "./pages/AlarmsPage";
import ConfigurationsPage from "./pages/ConfigurationsPage";
import ReportsPage from "./pages/ReportsPage";
import UsersPage from "./pages/UsersPage";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="stations" element={<StationsPage />} />
          <Route path="stations/:id" element={<StationDetailsPage />} />
          <Route path="map" element={<MapPage />} />
          <Route path="kpis" element={<KpiPage />} />
          <Route path="alarms" element={<AlarmsPage />} />
          <Route path="configurations" element={<ConfigurationsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route element={<ProtectedRoute adminOnly />}>
            <Route path="users" element={<UsersPage />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
