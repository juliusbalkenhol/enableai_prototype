import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import datasetRoutes from './routes/datasetRoutes';
import annotationJobRoutes from "./routes/annotationJobRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Health-Check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// API-Routen
app.use('/api/datasets', datasetRoutes);
app.use("/api/datasets", datasetRoutes);
app.use("/api/annotation-jobs", annotationJobRoutes);

export default app;
