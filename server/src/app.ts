import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { authenticate } from "./middlewares/auth.js";
import authRoutes from "./routes/auth.routes.js";
import stationRoutes from "./routes/station.routes.js";
import kpiRoutes from "./routes/kpi.routes.js";
import alarmRoutes from "./routes/alarm.routes.js";
import configurationRoutes from "./routes/configuration.routes.js";
import userRoutes from "./routes/user.routes.js";
import reportRoutes from "./routes/report.routes.js";

export const app = express();

app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ status: "ok", service: "MIMO 5G Monitoring API" }));
app.use("/api/auth", authRoutes);
app.use("/api/stations", authenticate, stationRoutes);
app.use("/api/kpis", authenticate, kpiRoutes);
app.use("/api/alarms", authenticate, alarmRoutes);
app.use("/api/configurations", authenticate, configurationRoutes);
app.use("/api/users", authenticate, userRoutes);
app.use("/api/reports", authenticate, reportRoutes);

app.use(errorHandler);

