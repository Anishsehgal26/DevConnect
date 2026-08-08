import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    userId: number;
  };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  const token = authHeader.replace("Bearer ", "");

try {
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET || "devconnect_secret"
  ) as any;

  req.user = { userId: decoded.userId };
  next();
} catch {
  res.status(401).json({ message: "Invalid token" });
  return;
}
};