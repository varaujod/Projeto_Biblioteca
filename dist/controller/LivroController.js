"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroController = void 0;
const LivroService_1 = require("../service/LivroService");
class LivroController {
    livroService = new LivroService_1.LivroService();
    criarLivro(req, res) {
        try {
            const livro = this.livroService.novoLivro(req.body);
            res.status(201).json(livro);
        }
        catch (error) {
            let message = "Não foi possivel criar Livro!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    listarLivros(req, res) {
        try {
            const lista = this.livroService.listarLivros();
            res.status(200).json(lista);
        }
        catch (error) {
            let message = "Não conseguimos realizar a listagem";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    filtrarLivro(req, res) {
        try {
            const livro = this.livroService.filtrarLivro({ isbn: Number(req.params.isbn) });
            res.status(200).json(livro);
        }
        catch (error) {
            let message = "Não existe esse livro em nosso cadastro, por favor cadastre esse livro";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    atualizarLivro(req, res) {
        try {
            const livroAtualizado = this.livroService.atualizaLivro({
                isbn: Number(req.params.isbn),
                novosDados: req.body
            });
            res.status(200).json(livroAtualizado);
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
    removerLivro(req, res) {
        try {
            const isbn = Number(req.params.isbn);
            const usuario = this.livroService.removeLivro(isbn);
            res.status(200).json({
                "status": "Usuario Deletado com Sucesso!",
                "usuario": usuario
            });
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
}
exports.LivroController = LivroController;
