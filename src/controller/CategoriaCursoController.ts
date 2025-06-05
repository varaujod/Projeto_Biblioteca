import { CategoriaCursoService } from "../service/CategoriaCursoService";
import { Request, Response } from "express";

export class CategoriaCursoController{
    private categoriaCursoService = new CategoriaCursoService();

    listarCurso(req: Request, res: Response): void{
        try{
            const lista = this.categoriaCursoService.listarCursos();
            res.status(200).json(lista);
        } catch(error: unknown){
           let message = "Não conseguimos realizar a listagem de cursos";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            })
        }
    }
}