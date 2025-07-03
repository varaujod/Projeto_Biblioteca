import { LivroService } from "../service/LivroService";
import { Request, Response } from "express";

export class LivroController{
    private livroService = new LivroService();

    async criarLivro(req: Request, res: Response){
        try{
            const livro = await this.livroService.novoLivro(req.body);
            res.status(201).json(livro);
        } catch(err){
            const message = err instanceof Error ? err.message: 'Não foi possivel criar o Livro!';
            res.status(400).json({
                message: message
            });
        }
    }

    async listarLivros(req: Request, res: Response){
        try{
            const lista = await this.livroService.listarLivros();
            res.status(200).json(lista);
        } catch(err){
            const message = err instanceof Error ? err.message: 'Não foi possivel listar os livros!';
            res.status(400).json({
                message: message
            });
        }
    }

    async filtrarLivro(req: Request, res: Response){
        try{
            const livro = await this.livroService.filtrarLivro({ isbn: String(req.params.isbn) });
            res.status(200).json(livro);
        } catch(err){
            const message = err instanceof Error ? err.message: 'Não foi possivel filtrar o livro!';
            res.status(400).json({
                message: message
            });
        }
    }

    async atualizarLivro(req: Request, res: Response){
        try{
            const livroAtualizado = await this.livroService.atualizaLivro({
                isbn: String(req.params.isbn),
                novosDados: req.body
            });

            res.status(200).json({
                "message": "Livro atualizado com sucesso!",
                "livro": livroAtualizado
            });
        } catch(err){
            const message = err instanceof Error ? err.message: 'Não foi possivel atualizar o Livro!';
            res.status(400).json({
                message: message
            });
        }
    }

    async removerLivro(req: Request, res: Response){
        try{
            const isbn = String(req.params.isbn);
            const livro = await this.livroService.removeLivro(isbn);

            res.status(200).json({
                "status": "Livro Deletado com Sucesso!",
                "livro": livro

            })
        } catch(err){
            const message = err instanceof Error ? err.message: 'Não foi possivel deletar o Livro!';
            res.status(400).json({
                message: message
            });
        }
    }

}