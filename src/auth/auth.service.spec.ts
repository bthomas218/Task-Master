import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { describe, expect, it, jest } from "@jest/globals";
import { PrismaService } from "../prisma/prisma.service.js";
import { hashPassword } from "../utils/auth.js";
import { AuthService } from "./auth.service.js";

describe("AuthService", () => {
  const config = {
    get: jest.fn((key: string) => (key === "JWT_SECRET" ? "test-secret" : undefined)),
  } as unknown as ConfigService;

  function createService(prisma: Partial<PrismaService>) {
    return new AuthService(prisma as PrismaService, config);
  }

  it("rejects duplicate registration", async () => {
    const service = createService({
      user: {
        findUnique: jest.fn().mockResolvedValue({ id: "user-id" }),
      },
    } as unknown as PrismaService);

    await expect(
      service.register({ email: "taken@example.com", password: "password123" }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it("rejects invalid login credentials", async () => {
    const service = createService({
      user: {
        findUnique: jest.fn().mockResolvedValue(null),
      },
    } as unknown as PrismaService);

    await expect(
      service.login({ email: "missing@example.com", password: "password123" }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it("returns a token for valid credentials", async () => {
    const passwordHash = await hashPassword("password123");
    const service = createService({
      user: {
        findUnique: jest.fn().mockResolvedValue({
          id: "6f07f683-24c0-4f52-83bb-24506f8d8b56",
          email: "user@example.com",
          passwordHash,
        }),
      },
    } as unknown as PrismaService);

    await expect(
      service.login({ email: "user@example.com", password: "password123" }),
    ).resolves.toEqual({ token: expect.any(String) });
  });
});
