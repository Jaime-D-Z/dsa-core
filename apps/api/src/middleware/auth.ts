import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../shared/errors/AppError.js';

const JWT_SECRET = process.env['JWT_SECRET'] ?? 'dev-secret-change-in-prod';

export interface AuthPayload {
  userId: string;
  role?:  string;
}

// augmentar el tipo de Request de Express
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request { user?: AuthPayload; }
  }
}

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  const header = req.headers['authorization'];
  if (typeof header !== 'string' || !header.startsWith('Bearer ')) {
    return next(new AppError(401, 'Missing or invalid Authorization header'));
  }
  try {
    const token   = header.slice(7);
    req.user      = jwt.verify(token, JWT_SECRET) as AuthPayload;
    next();
  } catch {
    next(new AppError(401, 'Invalid or expired token'));
  }
}

/** Genera un token de prueba para desarrollo */
export function signToken(payload: AuthPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });
}
