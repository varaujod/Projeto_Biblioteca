"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoService = void 0;
const EmprestimoEntity_1 = require("../model/EmprestimoEntity");
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
const LivroRepository_1 = require("../repository/LivroRepository");
const CategoriaUsuarioRepository_1 = require("../repository/CategoriaUsuarioRepository");
class EmprestimoService {
    emprestimoRespository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
    usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance();
    estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
    livroRepository = LivroRepository_1.LivroRepository.getInstance();
    categoriaUsuarioRepository = CategoriaUsuarioRepository_1.CategoriaUsuarioRepository.getInstance();
    novoEmprestimo(data) {
        if (!data.usuario || !data.codExemplar || !data.categoria) {
            throw new Error("Por favor informar todos os campos");
        }
        const usuario = this.usuarioRepository.filtraUsuarioPorCPF(data.usuario);
        if (!usuario) {
            throw new Error("Usuário não encontrado!");
        }
        usuario.atualizarStatusPorAtraso(usuario.diasAtraso || 0);
        usuario.atualizarLivrosAtrasados(usuario.livrosAtrasados || 0);
        if (usuario.status != 'ativo') {
            throw new Error("Usuário não está ativo para realizar empréstimos!");
        }
        if (this.emprestimoRespository.verificarUsuarioSuspenso(data.usuario)) {
            this.usuarioRepository.atualizarUsuarioPorCPF(data.usuario, { status: 'suspenso' });
            throw new Error("Usuário possui empréstimos em atraso!");
        }
        const exemplar = this.estoqueRepository.filtraLivroNoEstoque(data.codExemplar);
        if (!exemplar) {
            throw new Error("Exemplar não encontrado!");
        }
        if (exemplar.disponibilidade === 'não-disponivel') {
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
        const exemplarEmprestado = this.emprestimoRespository.filtraEmprestimoAtivoDoExemplar(data.codExemplar);
        if (exemplarEmprestado) {
            throw new Error("Este exemplar já está emprestado!");
        }
        if (!this.categoriaUsuarioRepository.encontrarCategoria(data.categoria)) {
            throw new Error("Por favor informar uma categoria existente");
        }
        const novoEmprestimo = new EmprestimoEntity_1.EmprestimoEntity(data.usuario, data.codExemplar, data.categoria);
        this.estoqueRepository.atualizarDisponibilidade(data.codExemplar, { disponibilidade: 'não-disponivel' });
        const exemplarEstoque = this.estoqueRepository.filtraLivroNoEstoque(data.codExemplar);
        if (exemplarEstoque && exemplarEstoque.isbn) {
            this.livroRepository.atualizarLivroPorISBN(exemplarEstoque.isbn, { status: 'emprestado' });
        }
        this.emprestimoRespository.insereEmprestimo(novoEmprestimo);
        return novoEmprestimo;
    }
    listarEmprestimos() {
        return this.emprestimoRespository.listarEmprestimos();
    }
    listarEmprestimosAtivos() {
        return this.emprestimoRespository.listarEmprestimosAtivos();
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
        const emprestimo = this.emprestimoRespository.filtraEmprestimoPorID(id);
        if (!emprestimo) {
            throw new Error("Empréstimo não encontrado!");
        }
        const usuario = this.usuarioRepository.filtraUsuarioPorCPF(emprestimo.usuario);
        if (!usuario) {
            throw new Error("Usuário não encontrado!");
        }
        usuario.status = novoStatus;
        this.usuarioRepository.atualizarUsuarioPorCPF(usuario.cpf, usuario);
        if (novoStatus == 'devolvido') {
            this.estoqueRepository.atualizarDisponibilidade(emprestimo.codExemplar, { disponibilidade: 'disponivel' });
            const exemplarEstoque = this.estoqueRepository.filtraLivroNoEstoque(emprestimo.codExemplar);
            if (exemplarEstoque && exemplarEstoque.isbn) {
                this.livroRepository.atualizarLivroPorISBN(exemplarEstoque.isbn, { status: 'disponivel' });
            }
            return this.emprestimoRespository.atualizarStatusEmprestimo(id, novoStatus);
        }
        throw new Error("Não foi possivel registrar a sua devolução!");
    }
}
exports.EmprestimoService = EmprestimoService;
