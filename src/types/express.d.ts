import "express";
import { User } from "../interfaces/user.interface";

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}
