import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../prisma/prisma.service.js";
import { generateToken, hashPassword, verifyPassword } from "../utils/auth.js";
import type { LoginDto, RegisterDto } from "./dto/auth.dto.js";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async register({ email, password }: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new BadRequestException("User already exists");
    }

    const passwordHash = await hashPassword(password);
    return this.prisma.user.create({
      data: { email, passwordHash },
      select: {
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async login({ email, password }: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !(await verifyPassword(user.passwordHash, password))) {
      throw new UnauthorizedException("Invalid email or password");
    }

    return {
      token: generateToken(user.id, 3600, this.jwtSecret),
    };
  }

  private get jwtSecret() {
    const jwtSecret = this.config.get<string>("JWT_SECRET");
    if (!jwtSecret) {
      throw new Error("Environment variable JWT_SECRET is required but not set.");
    }
    return jwtSecret;
  }
}
