"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroRepository = void 0;
class LivroRepository {
    static instance;
    LivroList = [];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new LivroRepository();
        }
        return this.instance;
    }
    insereLivro(livro) {
        this.LivroList.push(livro);
    }
    filtraLivroPorISBN(isbn) {
        return this.LivroList.find(livro => livro.isbn === isbn);
    }
    removeLivroPorISBN(isbn) {
        const index = this.findIndex(isbn);
        return this.LivroList.splice(index, 1);
    }
    atualizarLivroPorISBN(isbn, novosDados) {
        const index = this.findIndex(isbn);
        const livro = this.LivroList[index];
        if (novosDados.titulo) {
            livro.titulo = novosDados.titulo;
        }
        if (novosDados.autor) {
            livro.autor = novosDados.autor;
        }
        if (novosDados.editora) {
            livro.editora = novosDados.editora;
        }
        if (novosDados.edicao) {
            livro.edicao = novosDados.edicao;
        }
        if (novosDados.categoria) {
            livro.categoria = novosDados.categoria;
        }
    }
    listarLivros() {
        return this.LivroList;
    }
    findIndex(isbn) {
        const index = this.LivroList.findIndex(livro => livro.isbn == isbn);
        if (index == -1) {
            throw new Error("ISBN informado não foi encontrado!");
        }
        return index;
    }
}
exports.LivroRepository = LivroRepository;
