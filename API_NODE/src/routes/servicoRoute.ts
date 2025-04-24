import express, { Request, Response } from 'express';
const router = express.Router();
import servicoController from '../controllers/servicoController';
import { verifyToken, verifyFuncionarioRole } from '../middleware/authMiddleware';

// Rotas protegidas por token e papel de funcionário
router.get('/servico', verifyToken, verifyFuncionarioRole, async (req: Request, res: Response) => {
    try {
        await servicoController.getServico(req, res);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao obter serviços', error: err });
    }
});

router.put('/servico/:id', verifyToken, verifyFuncionarioRole, async (req: Request, res: Response) => {
    try {
        await servicoController.updateServico(req, res);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar serviço', error: err });
    }
});

router.delete('/servico/:id', verifyToken, verifyFuncionarioRole, async (req: Request, res: Response) => {
    try {
        await servicoController.deleteServico(req, res);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao deletar serviço', error: err });
    }
});

router.get('/servico/:id', verifyToken, verifyFuncionarioRole, async (req: Request, res: Response) => {
    try {
        await servicoController.details(req, res);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao obter detalhes do serviço', error: err });
    }
});

export default router;
