import { Request, Response } from 'express';
import * as datasetService from '../services/datasetService';
import { z } from 'zod';

// Zod-Schema zur Validierung der Request-Bodies
const datasetCreateSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  price: z.number().min(0).optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional()
});

const datasetUpdateSchema = datasetCreateSchema.partial();

export const getAllDatasets = async (_req: Request, res: Response) => {
  const datasets = await datasetService.getAllDatasets();
  res.json(datasets);
};

export const getDatasetById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const dataset = await datasetService.getDatasetById(id);

  if (!dataset) {
    return res.status(404).json({ message: 'Dataset not found' });
  }
  res.json(dataset);
};

export const createDataset = async (req: Request, res: Response) => {
  try {
    const parsed = datasetCreateSchema.parse(req.body);
    const dataset = await datasetService.createDataset(parsed);
    res.status(201).json(dataset);
  } catch (error: any) {
    res.status(400).json({ message: 'Invalid input', details: error.errors });
  }
};

export const updateDataset = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const parsed = datasetUpdateSchema.parse(req.body);
    const dataset = await datasetService.updateDataset(id, parsed);
    res.json(dataset);
  } catch (error: any) {
    res.status(400).json({ message: 'Invalid input or dataset not found' });
  }
};

export const deleteDataset = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await datasetService.deleteDataset(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(404).json({ message: 'Dataset not found' });
  }
};
