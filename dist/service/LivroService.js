"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroService = void 0;
const CategoriaLivroRepository_1 = require("../repository/CategoriaLivroRepository");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const LivroRepository_1 = require("../repository/LivroRepository");
class LivroService {
    livroRepository = LivroRepository_1.LivroRepository.getInstance();
    categoriaLivroRepository = CategoriaLivroRepository_1.CategoriaLivroRepository.getInstance();
    estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
    async novoLivro(data) {
        if (!(await this.categoriaLivroRepository.encontrarCategoriaLivro(data.categoria))) {
            throw new Error("Por favor informar uma categoria existente");
        }
        if (!this.livroRepository.validacaoISBN(data.isbn)) {
            throw new Error("É necessário de 13 números obrigatorios da ISBN para cadastrar um livro!");
        }
        if (await this.livroRepository.validacaoLivro(data.isbn)) {
            throw new Error("Este livro já é cadastrado!");
        }
        return await this.livroRepository.insereLivro(data);
    }
    filtrarLivro(data) {
        const isbn = data.isbn;
        const livro = this.livroRepository.filtraLivroPorISBN(isbn);
        if (livro === null) {
            throw new Error("Este livro ainda não foi cadastrado com esta ISBN!");
        }
        return livro;
    }
    async removeLivro(isbn) {
        const exemplares = await this.estoqueRepository.listarEstoque();
        for (const exemplar of exemplares) {
            const emprestimosAtivoDoLivro = await this.estoqueRepository.quantidadeLivrosEmprestados(exemplar.id);
            if (emprestimosAtivoDoLivro) {
                throw new Error("Não é possível remover o livro: há exemplares emprestados!");
            }
        }
        const livroRemovido = await this.livroRepository.removeLivroPorISBN(isbn);
        if (!livroRemovido) {
            throw new Error("Livro não encontrado para remoção!");
        }
        return livroRemovido;
    }
    async listarLivros() {
        return await this.livroRepository.listarLivros();
    }
    async atualizaLivro(data) {
        const isbn = data.isbn;
        const novosDados = data.novosDados;
        return await this.livroRepository.atualizarLivroPorISBN(isbn, novosDados);
    }
}
exports.LivroService = LivroService;
