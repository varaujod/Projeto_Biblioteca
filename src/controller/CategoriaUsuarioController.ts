import { CategoriaUsuarioService } from "../service/CategoriaUsuarioService";
import { Request, Response } from "express";

export class CategoriaUsuarioController{
    private categoriaUsuarioService = new CategoriaUsuarioService();

    listarCategoria(req: Request, res: Response): void{
        try{
            const lista = this.categoriaUsuarioService.listarCategoria();
            res.status(200).json(lista);
        } catch(error: unknown){
           let message = "Não conseguimos realizar a listagem de categoria de usuarios";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            })
        }
    }
}

