import { EmprestimoService } from "../service/EmprestimoService";
import { Request, Response } from "express";

export class EmprestimoController{
    private emprestimoService = new EmprestimoService();

    novoEmprestimo(req: Request, res: Response): void{
        try{
            const emprestimo = this.emprestimoService.novoEmprestimo(req.body);
            res.status(200).json({
                "message": "Emprestimo realizado com Sucesso! :)",
                "emprestimo": emprestimo
            })
        } catch(error: unknown){
            let message: string = "Não foi possivel realizar o emprestimo!"
            if(error instanceof Error){
                message = error.message
            }
            res.status(400).json({
                message: message
            })
        }
    }

    listarEmprestimos(req: Request, res: Response): void{
        try{
            const lista = this.emprestimoService.listarEmprestimos();
            res.status(200).json(lista);
        } catch(error: unknown){
            let message = "Não conseguimos realizar a listagem dos emprestimos feitos!";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            })
        }
    }

    filtraEmprestimoPorID(req: Request, res: Response){
        try{
            const emprestimo = this.emprestimoService.filtrarEmprestimoPorID({ id: Number(req.params.id)});
            res.status(200).json(emprestimo);
        } catch(error: unknown){
            let message = "Não existe esse emprestimo em nosso cadastro, por favor cadastre um emprestimo";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            })
        }
    }

    registrarDevolucao(req: Request, res: Response){
        try{
            const devolucao = this.emprestimoService.registrarDevolucao({
                id: Number(req.params.id),
                novoStatus: "devolvido"
            });

            res.status(200).json({
                "message": "Devolução concluida com sucesso!",
                "devolução": devolucao
            });
        } catch(error: unknown){
            let message = "Não foi possivel realizar a devolução!";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            })
        }
    }
}