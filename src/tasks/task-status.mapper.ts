import { TaskStatus } from "@prisma/client";
import type { TaskStatusDto } from "./dto/task.dto.js";

export function toPrismaTaskStatus(status: TaskStatusDto): TaskStatus {
  switch (status) {
    case "todo":
      return TaskStatus.TODO;
    case "in_progress":
      return TaskStatus.IN_PROGRESS;
    case "complete":
      return TaskStatus.COMPLETE;
  }
}

export function fromPrismaTaskStatus(status: TaskStatus): TaskStatusDto {
  switch (status) {
    case TaskStatus.TODO:
      return "todo";
    case TaskStatus.IN_PROGRESS:
      return "in_progress";
    case TaskStatus.COMPLETE:
      return "complete";
  }
}
