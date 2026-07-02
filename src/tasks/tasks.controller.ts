import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  CurrentUser,
  type CurrentUser as CurrentUserType,
} from "../auth/current-user.decorator.js";
import { JwtAuthGuard } from "../auth/jwt-auth.guard.js";
import { ZodValidationPipe } from "../common/pipes/zod-validation.pipe.js";
import {
  taskCreateSchema,
  taskIdSchema,
  taskQuerySchema,
  taskUpdateSchema,
} from "./dto/task.dto.js";
import type {
  CreateTaskDto,
  TaskIdDto,
  TaskQueryDto,
  UpdateTaskDto,
} from "./dto/task.dto.js";
import { TasksService } from "./tasks.service.js";

@Controller("tasks")
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(
    @CurrentUser() user: CurrentUserType,
    @Body(new ZodValidationPipe(taskCreateSchema)) body: CreateTaskDto,
  ) {
    return this.tasksService.createTask(user.id, body);
  }

  @Get()
  async listTasks(
    @CurrentUser() user: CurrentUserType,
    @Query(new ZodValidationPipe(taskQuerySchema)) query: TaskQueryDto,
  ) {
    return this.tasksService.listTasks(user.id, query.status);
  }

  @Get(":id")
  async getTask(
    @CurrentUser() user: CurrentUserType,
    @Param(new ZodValidationPipe(taskIdSchema)) params: TaskIdDto,
  ) {
    return this.tasksService.getTask(user.id, params.id);
  }

  @Put(":id")
  @HttpCode(HttpStatus.OK)
  async updateTask(
    @CurrentUser() user: CurrentUserType,
    @Param(new ZodValidationPipe(taskIdSchema)) params: TaskIdDto,
    @Body(new ZodValidationPipe(taskUpdateSchema)) body: UpdateTaskDto,
  ) {
    if (!body.description && !body.status) {
      return undefined;
    }
    return this.tasksService.updateTask(user.id, params.id, body);
  }

  @Delete(":id")
  async deleteTask(
    @CurrentUser() user: CurrentUserType,
    @Param(new ZodValidationPipe(taskIdSchema)) params: TaskIdDto,
  ) {
    return this.tasksService.deleteTask(user.id, params.id);
  }
}
