import { Router } from 'express';
import { verifyToken, verifyFuncionarioRole } from '../middleware/authMiddleware';
import * as funcionarioController from '../controllers/funcionarioController';

const router = Router();

// Rotas protegidas por token e papel de funcionário
router.get('/funcionario', verifyToken, verifyFuncionarioRole, funcionarioController.getFuncionarios);
router.put('/funcionario/:id', verifyToken, verifyFuncionarioRole, funcionarioController.updateFuncionario);
router.delete('/funcionario/:id', verifyToken, verifyFuncionarioRole, funcionarioController.deleteFuncionario);
router.get('/funcionario/:id', verifyToken, verifyFuncionarioRole, funcionarioController.getFuncionarioById);

export default router;
