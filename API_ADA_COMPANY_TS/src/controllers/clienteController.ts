import { Request, Response } from 'express';
import Cliente from '../models/clienteModel';

// Buscar todos os clientes
export const getClientes = async (req: Request, res: Response): Promise<void> => {
    try {
        const clientes = await Cliente.find().select('-usuario.senha').limit(1);
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar clientes" });
    }
};

// Atualizar um cliente
export const updateCliente = async (req: Request, res: Response): Promise<void> => {
    try {
        const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (cliente) {
            res.json(cliente);
        } else {
            res.status(404).json({ message: "Cliente não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar cliente" });
    }
};

// Excluir um cliente
export const deleteCliente = async (req: Request, res: Response): Promise<void> => {
    try {
        const cliente = await Cliente.findByIdAndDelete(req.params.id);
        if (cliente) {
            res.json({ message: "Cliente excluído com sucesso" });
        } else {
            res.status(404).json({ message: "Cliente não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao excluir cliente" });
    }
};

// Detalhes de um cliente específico
export const details = async (req: Request, res: Response): Promise<void> => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        if (cliente) {
            res.json(cliente);
        } else {
            res.status(404).json({ message: "Cliente não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar detalhes do cliente" });
    }
};
