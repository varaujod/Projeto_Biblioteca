"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioController = void 0;
const CategoriaUsuarioService_1 = require("../service/CategoriaUsuarioService");
class CategoriaUsuarioController {
    categoriaUsuarioService = new CategoriaUsuarioService_1.CategoriaUsuarioService();
    novaCategoria(req, res) {
        try {
            const emprestimo = this.categoriaUsuarioService.novaCategoria(req.body);
            res.status(200).json({
                "message": "Categoria cadastrada com Sucesso! :)",
                "categoria": emprestimo
            });
        }
        catch (error) {
            let message = "Não foi possivel realizar o cadastro de categoria!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    listarCategoria(req, res) {
        try {
            const lista = this.categoriaUsuarioService.listarCategoria();
            res.status(200).json(lista);
        }
        catch (error) {
            let message = "Não conseguimos realizar a listagem de usuários";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
}
exports.CategoriaUsuarioController = CategoriaUsuarioController;
