import { Router } from 'express';
import { verifyToken, verifyFuncionarioRole } from '../middleware/authMiddleware';
import * as clienteController from '../controllers/clienteController';

const router = Router();

// Rotas protegidas por token e papel de funcionário
router.get('/cliente', verifyToken, verifyFuncionarioRole, clienteController.getClientes);
router.put('/cliente/:id', verifyToken, verifyFuncionarioRole, clienteController.updateCliente);
router.delete('/cliente/:id', verifyToken, verifyFuncionarioRole, clienteController.deleteCliente);
router.get('/cliente/:id', verifyToken, verifyFuncionarioRole, clienteController.details);

export default router;
