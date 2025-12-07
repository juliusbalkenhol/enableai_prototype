import { Router } from "express";
import * as annotationJobController from "../controllers/annotationJobController";

const router = Router();

// GET /api/annotation-jobs?datasetId=...
router.get("/", annotationJobController.getAnnotationJobs);

// POST /api/annotation-jobs
router.post("/", annotationJobController.createAnnotationJob);

export default router;
