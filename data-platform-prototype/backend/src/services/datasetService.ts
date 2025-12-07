import { prisma } from '../prisma';
import { DatasetStatus } from '@prisma/client';

export interface CreateDatasetInput {
  title: string;
  description?: string;
  price?: number;
  status?: DatasetStatus;
  ownerId?: string | null;
}

export interface UpdateDatasetInput {
  title?: string;
  description?: string;
  price?: number;
  status?: DatasetStatus;
}

export const getAllDatasets = async () => {
  return prisma.dataset.findMany({
    orderBy: { createdAt: 'desc' }
  });
};

export const getDatasetById = async (id: string) => {
  return prisma.dataset.findUnique({
    where: { id }
  });
};

export const createDataset = async (data: CreateDatasetInput) => {
  return prisma.dataset.create({
    data: {
      title: data.title,
      description: data.description,
      price: data.price ?? 0,
      status: data.status ?? 'DRAFT',
      ownerId: data.ownerId ?? null
    }
  });
};

export const updateDataset = async (id: string, data: UpdateDatasetInput) => {
  return prisma.dataset.update({
    where: { id },
    data
  });
};

export const deleteDataset = async (id: string) => {
  return prisma.dataset.delete({
    where: { id }
  });
};
