import { Request, Response } from 'express';
import Orcamento from '../models/orcamentoModel';

// Método para listar todos os orçamentos
export const getOrcamento = async (req: Request, res: Response): Promise<Response> => {
    try {
        const result = await Orcamento.find().limit(10).populate('clienteId'); // Popula o campo clienteId com dados relacionados
        return res.status(200).json(result);
    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(500).json({ message: 'Erro ao obter orçamentos', error: err.message });
        }
        return res.status(500).json({ message: 'Erro desconhecido ao obter orçamentos' });
    }
};


// Método para atualizar um orçamento (atualização parcial)
export const updateOrcamento = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;

        // Apenas os campos presentes no body serão atualizados
        const updateData: any = {};
        if (req.body.clienteId) updateData.clienteId = req.body.clienteId;
        if (req.body.validadeOrcamento) updateData.validadeOrcamento = req.body.validadeOrcamento;
        if (req.body.dataCriacao) updateData.dataCriacao = req.body.dataCriacao;
        if (req.body.valorTotal) updateData.valorTotal = req.body.valorTotal;
        if (req.body.tipoServico) updateData.tipoServico = req.body.tipoServico;
        if (req.body.statusOrcamento) updateData.statusOrcamento = req.body.statusOrcamento;
        if (req.body.descricao) updateData.descricao = req.body.descricao;
        if (req.body.emailVendedor) updateData.emailVendedor = req.body.emailVendedor;

        const updatedOrcamento = await Orcamento.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedOrcamento) {
            return res.status(404).json({ message: 'Orçamento não encontrado.' });
        }

        return res.status(200).json(updatedOrcamento);
    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(500).json({ message: `${err.message} - Falha ao atualizar o orçamento.` });
        }
        return res.status(500).json({ message: 'Erro desconhecido ao atualizar orçamento.' });
    }
};

// Método para deletar um orçamento
export const deleteOrcamento = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;

        const deletedOrcamento = await Orcamento.findByIdAndDelete(id);

        if (!deletedOrcamento) {
            return res.status(404).json({ message: 'Orçamento não encontrado.' });
        }

        return res.status(200).json({ message: 'Orçamento deletado com sucesso.' });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(500).json({ message: `${err.message} - Falha ao deletar o orçamento.` });
        }
        return res.status(500).json({ message: 'Erro desconhecido ao deletar orçamento.' });
    }
};

// Método para obter detalhes de um orçamento pelo ID
export const details = async (req: Request, res: Response): Promise<Response> => {
    try {
        const result = await Orcamento.findById(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Orçamento não encontrado.' });
        }
        return res.status(200).json(result);
    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(500).json({ message: 'Erro ao obter detalhes do orçamento', error: err.message });
        }
        return res.status(500).json({ message: 'Erro desconhecido ao obter detalhes do orçamento' });
    }
};
