import { NotFoundException } from "@nestjs/common";
import { describe, expect, it, jest } from "@jest/globals";
import { TaskStatus } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service.js";
import { TasksService } from "./tasks.service.js";

describe("TasksService", () => {
  const now = new Date("2026-07-02T12:00:00.000Z");
  const baseTask = {
    id: "6f07f683-24c0-4f52-83bb-24506f8d8b56",
    createdAt: now,
    updatedAt: now,
    completedAt: null,
    description: "Write tests",
    status: TaskStatus.TODO,
    userId: "a909fa63-8bc6-4210-ab79-dfa05c14bb9b",
  };

  function createService(prisma: Partial<PrismaService>) {
    return new TasksService(prisma as PrismaService);
  }

  it("sets completedAt when creating a complete task", async () => {
    const create = jest.fn().mockImplementation(({ data }: { data: object }) => ({
      ...baseTask,
      ...data,
    }));
    const service = createService({
      task: { create },
    } as unknown as PrismaService);

    const task = await service.createTask(baseTask.userId, {
      description: "Done",
      status: "complete",
    });

    expect(create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        status: TaskStatus.COMPLETE,
        completedAt: expect.any(Date),
      }),
    });
    expect(task.status).toBe("complete");
  });

  it("treats status=all as no status filter", async () => {
    const findMany = jest.fn().mockResolvedValue([baseTask]);
    const service = createService({
      task: { findMany },
    } as unknown as PrismaService);

    await service.listTasks(baseTask.userId, "all");

    expect(findMany).toHaveBeenCalledWith({
      where: { userId: baseTask.userId },
      orderBy: { createdAt: "desc" },
    });
  });

  it("clears completedAt when updating away from complete", async () => {
    const update = jest.fn().mockResolvedValue({
      ...baseTask,
      status: TaskStatus.IN_PROGRESS,
    });
    const service = createService({
      task: {
        findFirst: jest.fn().mockResolvedValue(baseTask),
        update,
      },
    } as unknown as PrismaService);

    await service.updateTask(baseTask.userId, baseTask.id, {
      status: "in_progress",
    });

    expect(update).toHaveBeenCalledWith({
      where: { id: baseTask.id },
      data: {
        status: TaskStatus.IN_PROGRESS,
        completedAt: null,
      },
    });
  });

  it("throws NotFoundException for tasks owned by another user", async () => {
    const service = createService({
      task: {
        findFirst: jest.fn().mockResolvedValue(null),
      },
    } as unknown as PrismaService);

    await expect(
      service.getTask(baseTask.userId, baseTask.id),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
