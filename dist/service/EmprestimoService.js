"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoService = void 0;
const EmprestimoEntity_1 = require("../model/EmprestimoEntity");
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
class EmprestimoService {
    emprestimoRespository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
    usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance();
    estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
    novoEmprestimo(data) {
        if (!data.id || !data.usuario || !data.codExemplar || !data.categoria) {
            throw new Error("Por favor informar todos os campos");
        }
        const usuario = this.usuarioRepository.filtraUsuarioPorCPF(data.usuario);
        if (!usuario) {
            throw new Error("Usuário não encontrado!");
        }
        if (usuario.status != 'ativo') {
            throw new Error("Usuário não está ativo para realizar empréstimos!");
        }
        if (this.emprestimoRespository.verificarUsuarioSuspenso(data.usuario)) {
            throw new Error("Usuário possui empréstimos em atraso!");
        }
        const exemplar = this.estoqueRepository.filtraLivroNoEstoque(data.codExemplar);
        if (!exemplar) {
            throw new Error("Exemplar não encontrado!");
        }
        if (!exemplar.disponibilidade) {
            throw new Error("Este exemplar não está disponível para empréstimo!");
        }
        let categoria;
        if (usuario.categoria == 'professor') {
            categoria = 'professor';
        }
        else {
            categoria = 'aluno';
        }
        if (!this.emprestimoRespository.verificarLimiteEmprestimo(data.usuario, categoria)) {
            let limite = 0;
            if (categoria === 'professor') {
                limite = 5;
            }
            else {
                limite = 3;
            }
            throw new Error(`Usuário já atingiu o limite máximo de ${limite} empréstimos simultâneos!`);
        }
        const emprestimoAtivo = this.emprestimoRespository.filtraEmprestimoAtivoDoExemplar(data.codExemplar);
        if (emprestimoAtivo) {
            throw new Error("Este exemplar já está emprestado!");
        }
        const novoEmprestimo = new EmprestimoEntity_1.EmprestimoEntity(this.emprestimoRespository.gerarNovoId(), data.usuario, data.codExemplar, data.categoria);
        this.estoqueRepository.atualizarDisponibilidade(data.codExemplar, false);
        this.emprestimoRespository.insereEmprestimo(novoEmprestimo);
        return novoEmprestimo;
    }
    listarEmprestimos() {
        return this.emprestimoRespository.listarEmprestimos();
    }
    filtrarEmprestimoPorID(data) {
        const id = data.id;
        const emprestimo = this.emprestimoRespository.filtraEmprestimoPorID(id);
        if (!emprestimo) {
            throw new Error("Emprestimo não encontrado");
        }
        return emprestimo;
    }
    registrarDevolucao(data) {
        const id = data.id;
        const novoStatus = data.novoStatus;
        if (novoStatus == 'devolvido') {
            return this.emprestimoRespository.atualizarStatusEmprestimo(id, novoStatus);
        }
        else {
            throw new Error("Não foi possivel registrar a sua devolução!");
        }
    }
}
exports.EmprestimoService = EmprestimoService;
