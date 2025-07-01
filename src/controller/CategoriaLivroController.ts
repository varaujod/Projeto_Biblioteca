import { CategoriaLivroService } from "../service/CategoriaLivroService";
import { Request, Response } from "express";

export class CategoriaLivroController{
    private categoriaLivroService = new CategoriaLivroService();

    async listarCategoriaLivro(req: Request, res: Response){
        try{
            const lista = await this.categoriaLivroService.listarCategoriaLivro();
            res.status(200).json(lista);
        } catch(err){
            const message = err instanceof Error ? err.message: 'Não foi possivel listar as categorias de livros!';
            res.status(400).json({
                message: message
            })
        }
    }
}
