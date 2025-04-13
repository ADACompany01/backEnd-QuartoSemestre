import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config';

// Estende a interface Request para incluir a propriedade user
interface AuthenticatedRequest extends Request {
  user?: any; 
}

// Middleware para verificar se o token é válido
export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Token não fornecido.' }); // Changed to 401
    return;
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET as string);
    req.user = decoded;
    next();
    console.log('Token recebido:', token);
    console.log('Token decodificado:', decoded);
  } catch (err) {
    res.status(401).json({ message: 'Token inválido.' });
  }
};

// Middleware para garantir que o usuário seja um funcionário
export const verifyFuncionarioRole = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  if (req.user?.role !== 'admin') {
    res.status(403).json({ message: 'Acesso restrito a funcionários.' });
    return;
  }
  next();
};
