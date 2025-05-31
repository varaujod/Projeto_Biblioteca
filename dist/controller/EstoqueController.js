"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueController = void 0;
const EstoqueService_1 = require("../service/EstoqueService");
class EstoqueController {
    estoqueService = new EstoqueService_1.EstoqueService();
    adicionarLivroNoEstoque(req, res) {
        try {
            const livro = this.estoqueService.novoLivronoEstoque(req.body);
            res.status(201).json({
                "message": "Livro adicionado com Sucesso no seu Estoque! :)",
                "livro": livro
            });
        }
        catch (error) {
            let message = "Não foi possivel adicionar o livro no estoque!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    listarEstoque(req, res) {
        try {
            const lista = this.estoqueService.listarEstoque();
            res.status(200).json(lista);
        }
        catch (error) {
            let message = "Não conseguimos realizar a listagem do seu estoque";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    filtrarLivroNoEstoque(req, res) {
        try {
            const livro = this.estoqueService.filtrarLivroNoEstoque({ cod: Number(req.params.cod) });
            res.status(200).json(livro);
        }
        catch (error) {
            let message = "Não existe esse exemplar em nosso cadastro, por favor cadastre esse exemplar";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    atualizarDisponibildade(req, res) {
        try {
            const disponibilidadeAtualizada = this.estoqueService.atualizarDisponibilidade({
                cod: Number(req.params.cod),
                novaDisponibilidade: req.body
            });
            res.status(200).json(disponibilidadeAtualizada);
        }
        catch (error) {
            let message = "Não foi possivel realizar atualização";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    removerLivroNoEstoque(req, res) {
        try {
            const cod = Number(req.params.cod);
            const livro = this.estoqueService.removerLivroNoEstoque(cod);
            res.status(200).json({
                "status": "Exemplar Deletado com sucesso em seu estoque!",
                "usuario": livro
            });
        }
        catch (error) {
            let message = "Não foi possivel realizar a remoção";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
}
exports.EstoqueController = EstoqueController;
