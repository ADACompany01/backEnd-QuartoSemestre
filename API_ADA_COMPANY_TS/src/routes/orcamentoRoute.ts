import express, { Request, Response } from 'express';
const router = express.Router();
import * as orcamentoController from '../controllers/orcamentoController';
import { verifyToken, verifyFuncionarioRole } from '../middleware/authMiddleware';

// Rotas protegidas por token e papel de funcionário
router.get('/orcamento', verifyToken, verifyFuncionarioRole, async (req: Request, res: Response) => {
    try {
        await orcamentoController.getOrcamento(req, res);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao obter orçamentos', error: err });
    }
});

router.put('/orcamento/:id', verifyToken, verifyFuncionarioRole, async (req: Request, res: Response) => {
    try {
        await orcamentoController.updateOrcamento(req, res);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar orçamento', error: err });
    }
});

router.delete('/orcamento/:id', verifyToken, verifyFuncionarioRole, async (req: Request, res: Response) => {
    try {
        await orcamentoController.deleteOrcamento(req, res);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao deletar orçamento', error: err });
    }
});

router.get('/orcamento/:id', verifyToken, verifyFuncionarioRole, async (req: Request, res: Response) => {
    try {
        await orcamentoController.details(req, res);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao obter detalhes do orçamento', error: err });
    }
});

export default router;
