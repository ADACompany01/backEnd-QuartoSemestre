import jwt from 'jsonwebtoken';

export const gerarTokenValido = (): string => {
    const payload = { id: '123', role: 'admin' }; 
    const secret = process.env.JWT_SECRET || ''; 
    return jwt.sign(payload, secret, { expiresIn: '1h' });
};