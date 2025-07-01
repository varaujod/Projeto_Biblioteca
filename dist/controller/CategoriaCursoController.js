"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaCursoController = void 0;
const CategoriaCursoService_1 = require("../service/CategoriaCursoService");
class CategoriaCursoController {
    categoriaCursoService = new CategoriaCursoService_1.CategoriaCursoService();
    async listarCurso(req, res) {
        try {
            const lista = await this.categoriaCursoService.listarCursos();
            res.status(200).json(lista);
        }
        catch (err) {
            const message = err instanceof Error ? err.message : 'Não foi possivel listar os cursos!';
            res.status(400).json({
                message: message
            });
        }
    }
}
exports.CategoriaCursoController = CategoriaCursoController;
