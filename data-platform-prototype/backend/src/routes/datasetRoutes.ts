import { Router } from 'express';
import * as datasetController from '../controllers/datasetController';

const router = Router();

// GET /api/datasets
router.get('/', datasetController.getAllDatasets);

// GET /api/datasets/:id
router.get('/:id', datasetController.getDatasetById);

// POST /api/datasets
router.post('/', datasetController.createDataset);

// PUT /api/datasets/:id
router.put('/:id', datasetController.updateDataset);

// DELETE /api/datasets/:id
router.delete('/:id', datasetController.deleteDataset);

export default router;
