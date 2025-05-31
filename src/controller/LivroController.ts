import { LivroService } from "../service/LivroService";
import { Request, Response } from "express";

export class LivroController{
    private livroService = new LivroService();

    criarLivro(req: Request, res: Response): void{
        try{
            const livro = this.livroService.novoLivro(req.body);
            res.status(201).json(livro);
        } catch(error: unknown){
            let message: string = "Não foi possivel criar Livro!"
            if(error instanceof Error){
                message = error.message
            }
            res.status(400).json({
                message: message
            })
        }
    }

    listarLivros(req: Request, res: Response): void{
        try{
            const lista = this.livroService.listarLivros();
            res.status(200).json(lista);
        } catch(error: unknown){
           let message = "Não conseguimos realizar a listagem";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            })
        }
    }

    filtrarLivro(req: Request, res: Response): void{
        try{
            const livro = this.livroService.filtrarLivro({ isbn: Number(req.params.isbn) });
            res.status(200).json(livro);
        } catch(error: unknown){
            let message = "Não existe esse livro em nosso cadastro, por favor cadastre esse livro";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            })
        }
    }

    atualizarLivro(req: Request, res: Response): void{
        try{
            const livroAtualizado = this.livroService.atualizaLivro({
                isbn: Number(req.params.isbn),
                novosDados: req.body
            });

            res.status(200).json(livroAtualizado);
        } catch(error: unknown){
            let message = "Não foi possivel realizar atualização";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            })
        }
    }

    removerLivro(req: Request, res: Response): void{
        try{
            const isbn = Number(req.params.isbn);
            const usuario = this.livroService.removeLivro(isbn);

            res.status(200).json({
                "status": "Usuario Deletado com Sucesso!",
                "usuario": usuario

            })
        } catch(error: unknown){
            let message = "Não foi possivel realizar atualização";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            })
        }
    }



}