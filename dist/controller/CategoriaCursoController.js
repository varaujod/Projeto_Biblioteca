"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaCursoController = void 0;
const CategoriaCursoService_1 = require("../service/CategoriaCursoService");
class CategoriaCursoController {
    categoriaCursoService = new CategoriaCursoService_1.CategoriaCursoService();
    listarCurso(req, res) {
        try {
            const lista = this.categoriaCursoService.listarCursos();
            res.status(200).json(lista);
        }
        catch (error) {
            let message = "Não conseguimos realizar a listagem de cursos";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
}
exports.CategoriaCursoController = CategoriaCursoController;
