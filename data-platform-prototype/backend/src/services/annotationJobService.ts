import { prisma } from "../prisma";
import { AnnotationJobStatus } from "@prisma/client";

export interface CreateAnnotationJobInput {
  title: string;
  instructions?: string;
  datasetId: string;
  status?: AnnotationJobStatus;
  priority?: number;
  assigneeEmail?: string;
  dueDate?: Date | null;
}

export const getAllAnnotationJobs = async () => {
  return prisma.annotationJob.findMany({
    include: {
      dataset: true
    },
    orderBy: { createdAt: "desc" }
  });
};

export const getAnnotationJobsByDataset = async (datasetId: string) => {
  return prisma.annotationJob.findMany({
    where: { datasetId },
    include: { dataset: true },
    orderBy: { createdAt: "desc" }
  });
};

export const createAnnotationJob = async (data: CreateAnnotationJobInput) => {
  return prisma.annotationJob.create({
    data: {
      title: data.title,
      instructions: data.instructions,
      datasetId: data.datasetId,
      status: data.status ?? "PENDING",
      priority: data.priority ?? 1,
      assigneeEmail: data.assigneeEmail,
      dueDate: data.dueDate ?? null
    },
    include: {
      dataset: true
    }
  });
};
