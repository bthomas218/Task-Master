import {
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import type { CanActivate, ExecutionContext } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { FastifyRequest } from "fastify";
import { decodeToken } from "../utils/auth.js";
import { CurrentUser } from "./current-user.decorator.js";

type AuthenticatedRequest = FastifyRequest & {
  user?: CurrentUser;
};

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("Missing or invalid Authorization header");
    }

    const jwtSecret = this.config.get<string>("JWT_SECRET");
    if (!jwtSecret) {
      throw new Error("Environment variable JWT_SECRET is required but not set.");
    }

    try {
      const token = authHeader.replace("Bearer", "").trim();
      const decodedToken = decodeToken(token, jwtSecret);
      if (!decodedToken.sub) {
        throw new UnauthorizedException("Token missing subject claim");
      }
      if (!decodedToken.iss || decodedToken.iss !== "Task-Master") {
        throw new UnauthorizedException("Token has invalid issuer");
      }

      request.user = { id: decodedToken.sub };
      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException("Invalid or expired token");
    }
  }
}
