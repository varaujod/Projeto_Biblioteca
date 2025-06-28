"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueController = void 0;
const EstoqueService_1 = require("../service/EstoqueService");
class EstoqueController {
    estoqueService = new EstoqueService_1.EstoqueService();
    async adicionarLivroNoEstoque(req, res) {
        try {
            const livro = await this.estoqueService.novoLivronoEstoque(req.body);
            res.status(201).json({
                "message": "Livro adicionado com Sucesso no seu Estoque! :)",
                "livro": livro
            });
        }
        catch (err) {
            const message = err instanceof Error ? err.message : 'Não foi possivel adicionar o livro no Estoque!';
            res.status(400).json({
                message: message
            });
        }
    }
    async listarEstoque(req, res) {
        try {
            const lista = await this.estoqueService.listarEstoque();
            res.status(200).json(lista);
        }
        catch (err) {
            const message = err instanceof Error ? err.message : 'Não foi possivel listar o seu estoque!';
            res.status(400).json({
                message: message
            });
        }
    }
    async filtrarLivroNoEstoque(req, res) {
        try {
            const id = Number(req.params.id);
            const resultado = await this.estoqueService.filtrarLivroNoEstoque({ id });
            res.status(200).json(resultado);
        }
        catch (err) {
            const message = err instanceof Error ? err.message : 'Não foi possivel filtrar o livro no seu estoque!';
            res.status(400).json({ message });
        }
    }
    async atualizarDisponibildade(req, res) {
        try {
            const disponibilidadeAtualizada = await this.estoqueService.atualizarDisponibilidade({
                cod: Number(req.params.cod),
                novaDisponibilidade: req.body
            });
            res.status(200).json({
                "message": "Disponibilidade atualizado com sucesso!",
                "livro": disponibilidadeAtualizada
            });
        }
        catch (err) {
            const message = err instanceof Error ? err.message : 'Não foi possivel atualizar a disponibilidade!';
            res.status(400).json({
                message: message
            });
        }
    }
    async removerLivroNoEstoque(req, res) {
        try {
            const id = Number(req.params.id);
            const livro = await this.estoqueService.removerLivroNoEstoque(id);
            res.status(200).json({
                "status": "Exemplar Deletado com sucesso em seu estoque!",
                "usuario": livro
            });
        }
        catch (err) {
            const message = err instanceof Error ? err.message : 'Não foi possivel deletar o Livro!';
            res.status(400).json({
                message: message
            });
        }
    }
}
exports.EstoqueController = EstoqueController;
