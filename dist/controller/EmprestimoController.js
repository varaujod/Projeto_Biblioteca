"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoController = void 0;
const EmprestimoService_1 = require("../service/EmprestimoService");
class EmprestimoController {
    emprestimoService = new EmprestimoService_1.EmprestimoService();
    novoEmprestimo(req, res) {
        try {
            const emprestimo = this.emprestimoService.novoEmprestimo(req.body);
            res.status(200).json({
                "message": "Emprestimo realizado com Sucesso! :)",
                "emprestimo": emprestimo
            });
        }
        catch (error) {
            let message = "Não foi possivel realizar o emprestimo!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    listarEmprestimos(req, res) {
        try {
            const lista = this.emprestimoService.listarEmprestimos();
            res.status(200).json(lista);
        }
        catch (error) {
            let message = "Não conseguimos realizar a listagem dos emprestimos feitos!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    filtraEmprestimoPorID(req, res) {
        try {
            const emprestimo = this.emprestimoService.filtrarEmprestimoPorID({ id: Number(req.params.id) });
            res.status(200).json(emprestimo);
        }
        catch (error) {
            let message = "Não existe esse emprestimo em nosso cadastro, por favor cadastre um emprestimo";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    registrarDevolucao(req, res) {
        try {
            const devolucao = this.emprestimoService.registrarDevolucao({
                id: Number(req.params.id),
                novoStatus: req.body
            });
            res.status(200).json({
                "message": "Devolução concluida com sucesso!",
                "devolução": devolucao
            });
        }
        catch (error) {
            let message = "Não foi possivel realizar a devolução!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
}
exports.EmprestimoController = EmprestimoController;
