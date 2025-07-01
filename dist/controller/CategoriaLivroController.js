"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroController = void 0;
const CategoriaLivroService_1 = require("../service/CategoriaLivroService");
class CategoriaLivroController {
    categoriaLivroService = new CategoriaLivroService_1.CategoriaLivroService();
    async listarCategoriaLivro(req, res) {
        try {
            const lista = await this.categoriaLivroService.listarCategoriaLivro();
            res.status(200).json(lista);
        }
        catch (err) {
            const message = err instanceof Error ? err.message : 'Não foi possivel listar as categorias de livros!';
            res.status(400).json({
                message: message
            });
        }
    }
}
exports.CategoriaLivroController = CategoriaLivroController;
