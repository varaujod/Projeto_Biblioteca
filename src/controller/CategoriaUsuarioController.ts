import { CategoriaUsuarioService } from "../service/CategoriaUsuarioService";
import { Request, Response } from "express";

export class CategoriaUsuarioController{
    private categoriaUsuarioService = new CategoriaUsuarioService();

    async listarCategoria(req: Request, res: Response){
        try{
            const lista = await this.categoriaUsuarioService.listarCategorias();
            res.status(200).json(lista);
        } catch(err){
            const message = err instanceof Error ? err.message: 'Não foi possivel listar as categorias de usuário!';
            res.status(400).json({
                message: message
            });
        }
    }
}

