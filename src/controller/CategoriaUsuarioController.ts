import { CategoriaUsuarioService } from "../service/CategoriaUsuarioService";
import { Request, Response } from "express";

export class CategoriaUsuarioController{
    private categoriaUsuarioService = new CategoriaUsuarioService();

    novaCategoria(req: Request, res: Response): void{
        try{
            const emprestimo = this.categoriaUsuarioService.novaCategoria(req.body);
            res.status(200).json({
                "message": "Categoria cadastrada com Sucesso! :)",
                "categoria": emprestimo
            })
        } catch(error: unknown){
            let message: string = "Não foi possivel realizar o cadastro de categoria!"
            if(error instanceof Error){
                message = error.message
            }
            res.status(400).json({
                message: message
            })
        }
    }

    listarCategoria(req: Request, res: Response): void{
        try{
            const lista = this.categoriaUsuarioService.listarCategoria();
            res.status(200).json(lista);
        } catch(error: unknown){
           let message = "Não conseguimos realizar a listagem de usuários";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            })
        }
    }
}

