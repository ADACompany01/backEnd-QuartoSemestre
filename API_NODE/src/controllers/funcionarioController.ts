import { Request, Response } from 'express';
import Funcionario from '../models/funcionarioModel';

// Buscar todos os funcionários
export const getFuncionarios = async (req: Request, res: Response): Promise<void> => {
    try {
        const funcionarios = await Funcionario.find().limit(10);
        res.json(funcionarios);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar funcionários" });
    }
};

// Atualizar um funcionário
export const updateFuncionario = async (req: Request, res: Response): Promise<void> => {
    try {
        const funcionario = await Funcionario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (funcionario) {
            res.json(funcionario);
        } else {
            res.status(404).json({ message: "Funcionário não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar funcionário" });
    }
};

// Excluir um funcionário
export const deleteFuncionario = async (req: Request, res: Response): Promise<void> => {
    try {
        const funcionario = await Funcionario.findByIdAndDelete(req.params.id);
        if (funcionario) {
            res.json({ message: "Funcionário excluído com sucesso" });
        } else {
            res.status(404).json({ message: "Funcionário não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao excluir funcionário" });
    }
};

// Detalhes de um funcionário específico
export const getFuncionarioById = async (req: Request, res: Response): Promise<void> => {
    try {
        const funcionario = await Funcionario.findById(req.params.id);
        if (funcionario) {
            res.json(funcionario);
        } else {
            res.status(404).json({ message: "Funcionário não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar detalhes do funcionário" });
    }
};
