import {
  BadRequestException,
  Injectable,
} from "@nestjs/common";
import type { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { z } from "zod";
import type { ZodType } from "zod";

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodType) {}

  async transform(value: unknown, _metadata: ArgumentMetadata) {
    try {
      return await this.schema.parseAsync(value);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new BadRequestException(
          `Validation failed: ${z.prettifyError(error)}`,
        );
      }
      throw error;
    }
  }
}
