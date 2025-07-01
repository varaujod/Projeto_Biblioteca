"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioController = void 0;
const CategoriaUsuarioService_1 = require("../service/CategoriaUsuarioService");
class CategoriaUsuarioController {
    categoriaUsuarioService = new CategoriaUsuarioService_1.CategoriaUsuarioService();
    async listarCategoria(req, res) {
        try {
            const lista = await this.categoriaUsuarioService.listarCategorias();
            res.status(200).json(lista);
        }
        catch (err) {
            const message = err instanceof Error ? err.message : 'Não foi possivel listar as categorias de usuário!';
            res.status(400).json({
                message: message
            });
        }
    }
}
exports.CategoriaUsuarioController = CategoriaUsuarioController;
