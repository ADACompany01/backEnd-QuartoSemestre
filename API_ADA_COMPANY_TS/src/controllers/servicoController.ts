import { Request, Response } from 'express';
import Servico from '../models/servicoModel'; 

// Função para obter todos os serviços
const getServico = async (req: Request, res: Response) => {
    try {
        const servicos = await Servico.find().limit(10);  // Obtém todos os serviços
        res.status(200).json(servicos);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao obter serviços', error: err });
    }
};

// Função para atualizar um serviço
const updateServico = async (req: Request, res: Response) => {
    try {
        const servico = await Servico.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!servico) {
            return res.status(404).json({ message: 'Serviço não encontrado' });
        }
        res.status(200).json(servico);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar serviço', error: err });
    }
};

// Função para excluir um serviço
const deleteServico = async (req: Request, res: Response) => {
    try {
        const servico = await Servico.findByIdAndDelete(req.params.id);
        if (!servico) {
            return res.status(404).json({ message: 'Serviço não encontrado' });
        }
        res.status(200).json({ message: 'Serviço excluído com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao excluir serviço', error: err });
    }
};

// Função para obter detalhes de um serviço específico
const details = async (req: Request, res: Response) => {
    try {
        const servico = await Servico.findById(req.params.id);
        if (!servico) {
            return res.status(404).json({ message: 'Serviço não encontrado' });
        }
        res.status(200).json(servico);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao obter detalhes do serviço', error: err });
    }
};

export default {
    getServico,
    updateServico,
    deleteServico,
    details
};
