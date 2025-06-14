"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroService = void 0;
const LivroEntity_1 = require("../model/LivroEntity");
const CategoriaLivroRepository_1 = require("../repository/CategoriaLivroRepository");
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const LivroRepository_1 = require("../repository/LivroRepository");
class LivroService {
    livroRepository = LivroRepository_1.LivroRepository.getInstance();
    categoriaLivroRepository = CategoriaLivroRepository_1.CategoriaLivroRepository.getInstance();
    estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
    emprestimoRepository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
    novoLivro(data) {
        if (!this.categoriaLivroRepository.encontrarCategoriaLivro(data.categoria)) {
            throw new Error("Por favor informar uma categoria existente");
        }
        if (!this.livroRepository.validacaoISBN(data.isbn)) {
            throw new Error("É necessário de 13 números obrigatorios da ISBN para cadastrar um livro!");
        }
        if (this.livroRepository.validacaoLivro(data.isbn)) {
            throw new Error("Este livro já é cadastrado!");
        }
        else {
            const livro = new LivroEntity_1.LivroEntity(data.titulo, data.isbn, data.autor, data.editora, data.edicao, data.categoria);
            this.livroRepository.insereLivro(livro);
            return livro;
        }
    }
    filtrarLivro(data) {
        const isbn = data.isbn;
        return this.livroRepository.filtraLivroPorISBN(isbn);
    }
    removeLivro(isbn) {
        const exemplares = this.estoqueRepository.listarEstoque().filter(e => e.isbn === isbn);
        for (const exemplar of exemplares) {
            const emprestimosAtivoDoLivro = this.estoqueRepository.quantidadeLivrosEmprestados(exemplar.cod);
            if (emprestimosAtivoDoLivro) {
                throw new Error("Não é possível remover o livro: há exemplares emprestados!");
            }
        }
        return this.livroRepository.removeLivroPorISBN(isbn);
    }
    listarLivros() {
        return this.livroRepository.listarLivros();
    }
    atualizaLivro(data) {
        const isbn = data.isbn;
        const novosDados = data.novosDados;
        return this.livroRepository.atualizarLivroPorISBN(isbn, novosDados);
    }
}
exports.LivroService = LivroService;
