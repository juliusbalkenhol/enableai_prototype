import { Request, Response } from "express";
import { z } from "zod";
import * as annotationJobService from "../services/annotationJobService";

const createAnnotationJobSchema = z.object({
  title: z.string().min(3),
  instructions: z.string().optional(),
  datasetId: z.string().min(1),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"]).optional(),
  priority: z.number().int().min(1).max(5).optional(),
  assigneeEmail: z.string().email().optional(),
  dueDate: z.string().datetime().optional() // ISO-String
});

export const getAnnotationJobs = async (req: Request, res: Response) => {
  const { datasetId } = req.query;

  if (datasetId && typeof datasetId === "string") {
    const jobs = await annotationJobService.getAnnotationJobsByDataset(datasetId);
    return res.json(jobs);
  }

  const jobs = await annotationJobService.getAllAnnotationJobs();
  res.json(jobs);
};

export const createAnnotationJob = async (req: Request, res: Response) => {
  try {
    const parsed = createAnnotationJobSchema.parse(req.body);

    const dueDate = parsed.dueDate ? new Date(parsed.dueDate) : null;

    const job = await annotationJobService.createAnnotationJob({
      title: parsed.title,
      instructions: parsed.instructions,
      datasetId: parsed.datasetId,
      status: parsed.status,
      priority: parsed.priority,
      assigneeEmail: parsed.assigneeEmail,
      dueDate
    });

    res.status(201).json(job);
  } catch (error: any) {
    res.status(400).json({
      message: "Invalid input for annotation job",
      details: error.errors ?? error.message
    });
  }
};
