import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma, TaskStatus } from "@prisma/client";
import type { Task } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service.js";
import type {
  CreateTaskDto,
  TaskStatusDto,
  UpdateTaskDto,
} from "./dto/task.dto.js";
import {
  fromPrismaTaskStatus,
  toPrismaTaskStatus,
} from "./task-status.mapper.js";

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async createTask(userId: string, task: CreateTaskDto) {
    const status = toPrismaTaskStatus(task.status);
    const createdTask = await this.prisma.task.create({
      data: {
        description: task.description,
        status,
        completedAt: status === TaskStatus.COMPLETE ? new Date() : null,
        userId,
      },
    });
    return this.toResponse(createdTask);
  }

  async listTasks(userId: string, status?: TaskStatusDto | "all") {
    const tasks = await this.prisma.task.findMany({
      where: {
        userId,
        ...(status && status !== "all"
          ? { status: toPrismaTaskStatus(status) }
          : {}),
      },
      orderBy: { createdAt: "desc" },
    });
    return tasks.map((task) => this.toResponse(task));
  }

  async getTask(userId: string, taskId: string) {
    const task = await this.prisma.task.findFirst({
      where: { id: taskId, userId },
    });
    if (!task) {
      throw new NotFoundException("Task not found");
    }
    return this.toResponse(task);
  }

  async updateTask(userId: string, taskId: string, updates: UpdateTaskDto) {
    const existingTask = await this.prisma.task.findFirst({
      where: { id: taskId, userId },
    });
    if (!existingTask) {
      throw new NotFoundException("Task not found");
    }

    const status = updates.status
      ? toPrismaTaskStatus(updates.status)
      : undefined;
    const data: Prisma.TaskUpdateInput = {};
    if (updates.description) {
      data.description = updates.description;
    }
    if (status) {
      data.status = status;
      data.completedAt = status === TaskStatus.COMPLETE ? new Date() : null;
    }

    const task = await this.prisma.task.update({
      where: { id: taskId },
      data,
    });

    return this.toResponse(task);
  }

  async deleteTask(userId: string, taskId: string) {
    const existingTask = await this.prisma.task.findFirst({
      where: { id: taskId, userId },
    });
    if (!existingTask) {
      throw new NotFoundException("Task not found");
    }

    const task = await this.prisma.task.delete({ where: { id: taskId } });
    return this.toResponse(task);
  }

  private toResponse(task: Task) {
    return {
      ...task,
      status: fromPrismaTaskStatus(task.status),
    };
  }
}
