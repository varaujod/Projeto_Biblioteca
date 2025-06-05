import { CategoriaLivroService } from "../service/CategoriaLivroService";
import { Request, Response } from "express";

export class CategoriaLivroController{
    private categoriaLivroService = new CategoriaLivroService();

    listarCategoriaLivro(req: Request, res: Response): void{
        try{
            const lista = this.categoriaLivroService.listarCategoriaLivro();
            res.status(200).json(lista);
        } catch(error: unknown){
           let message = "Não conseguimos realizar a listagem de categorias de livros";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            })
        }
    }
}
