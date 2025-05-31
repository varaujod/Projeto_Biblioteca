import { EstoqueService } from "../service/EstoqueService";
import { Request, Response } from "express";

export class EstoqueController{
    private estoqueService = new EstoqueService();

    adicionarLivroNoEstoque(req: Request, res: Response): void{
        try{
            const livro = this.estoqueService.novoLivronoEstoque(req.body);
            res.status(201).json({
                "message": "Livro adicionado com Sucesso no seu Estoque! :)",
                "livro": livro
            })
        } catch(error: unknown){
            let message: string = "Não foi possivel adicionar o livro no estoque!"
            if(error instanceof Error){
                message = error.message
            }
            res.status(400).json({
                message: message
            })
        }
    }

    listarEstoque(req: Request, res: Response): void{
        try{
            const lista = this.estoqueService.listarEstoque();
            res.status(200).json(lista);
        } catch(error: unknown){
            let message = "Não conseguimos realizar a listagem do seu estoque";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            })
        }
    }

    filtrarLivroNoEstoque(req: Request, res: Response): void{
        try{
            const livro = this.estoqueService.filtrarLivroNoEstoque({ cod: Number(req.params.cod) })
            res.status(200).json(livro);
        } catch(error: unknown){
            let message = "Não existe esse exemplar em nosso cadastro, por favor cadastre esse exemplar";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            })
        }
    }

    atualizarDisponibildade(req: Request, res: Response): void{
        try{
            const disponibilidadeAtualizada = this.estoqueService.atualizarDisponibilidade({
                cod: Number(req.params.cod),
                novaDisponibilidade: req.body
            });

            res.status(200).json(disponibilidadeAtualizada);
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

    removerLivroNoEstoque(req: Request, res: Response): void{
        try{
            const cod = Number(req.params.cod);
            const livro = this.estoqueService.removerLivroNoEstoque(cod);

            res.status(200).json({
                "status": "Exemplar Deletado com sucesso em seu estoque!",
                "usuario": livro

            })
        } catch(error: unknown){
            let message = "Não foi possivel realizar a remoção";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            })
        }
    }

}