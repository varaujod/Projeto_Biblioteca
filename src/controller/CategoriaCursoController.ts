import { CategoriaCursoService } from "../service/CategoriaCursoService";
import { Request, Response } from "express";

export class CategoriaCursoController{
    private categoriaCursoService = new CategoriaCursoService();

    async listarCurso(req: Request, res: Response){
        try{
            const lista = await this.categoriaCursoService.listarCursos();
            res.status(200).json(lista);
        } catch(err){
            const message = err instanceof Error ? err.message: 'Não foi possivel listar os cursos!';
            res.status(400).json({
                message: message
            });
        }
    }
}