import { EmprestimoService } from "../service/EmprestimoService";
import { Request, Response } from "express";

export class EmprestimoController{
    private emprestimoService = new EmprestimoService();

    async novoEmprestimo(req: Request, res: Response){
        try{
            const emprestimo = await this.emprestimoService.novoEmprestimo(req.body);
            res.status(200).json({
                "message": "Emprestimo realizado com Sucesso! :)",
                "emprestimo": emprestimo
            })
        } catch(err){
            const message = err instanceof Error ? err.message: 'Não foi possivel realizar um emprestimo!';
            res.status(400).json({
                message: message
            });
        }
    }

    async listarEmprestimos(req: Request, res: Response){
        try{
            const lista = await this.emprestimoService.listarEmprestimos();
            const ativos = await this.emprestimoService.listarEmprestimosAtivos();
            res.status(200).json({
                "message": "Emprestimos Ativos",
                "emprestimos": ativos,
                "historico": "Histórico de Emprestimo",
                "lista": lista
            });
        } catch(err){
            const message = err instanceof Error ? err.message: 'Não foi possivel listar os emprestimos!';
            res.status(400).json({
                message: message
            });
        }
    }

    async filtraEmprestimoPorID(req: Request, res: Response){
        try{
            const emprestimo = await this.emprestimoService.filtrarEmprestimoPorID({ id: Number(req.params.id)});
            res.status(200).json(emprestimo);
        } catch(err){
            const message = err instanceof Error ? err.message: 'Não foi possivel filtrar o emprestimo por id!';
            res.status(400).json({ message });
        }
    }

    async registrarDevolucao(req: Request, res: Response){
        try{
            const devolucao = await this.emprestimoService.registrarDevolucao({
                id: Number(req.params.id),
                novoStatus: "devolvido"
            });

            res.status(200).json({
                "message": "Devolução concluida com sucesso!",
                "devolução": devolucao
            });
        } catch(err){
            const message = err instanceof Error ? err.message: 'Não foi possivel registrar devolução!';
            res.status(400).json({
                message: message
            });
        }
    }
}