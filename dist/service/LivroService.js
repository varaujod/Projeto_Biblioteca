"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroService = void 0;
const LivroEntity_1 = require("../model/LivroEntity");
const LivroRepository_1 = require("../repository/LivroRepository");
class LivroService {
    livroRepository = LivroRepository_1.LivroRepository.getInstance();
    novoLivro(data) {
        if (!data.titulo || !data.isbn || !data.autor || !data.editora || !data.edicao || !data.categoria) {
            throw new Error("Por favor informar todos os campos");
        }
        if (data.categoria != "Romance" && data.categoria != "Computação" && data.categoria != "Letras" && data.categoria != "Gestão") {
            throw new Error("Por favor informar uma categoria existente");
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
