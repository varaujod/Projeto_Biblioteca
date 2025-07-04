"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroRepository = void 0;
const mysql_1 = require("../database/mysql");
const LivroEntity_1 = require("../model/entity/LivroEntity");
class LivroRepository {
    static instance;
    constructor() {
        this.criarTable();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new LivroRepository();
        }
        return this.instance;
    }
    async criarTable() {
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.Livro(
                id INT AUTO_INCREMENT PRIMARY KEY,
                titulo VARCHAR(255) NOT NULL,
                isbn VARCHAR(13) NOT NULL UNIQUE,
                autor VARCHAR(255) NOT NULL UNIQUE,
                editora VARCHAR(255) NOT NULL UNIQUE,
                edicao VARCHAR(255) NOT NULL UNIQUE,
                categoria VARCHAR(255) NOT NULL,
                status VARCHAR(15) NOT NULL
                )`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log('Tabela de Livro criada com Sucesso!', resultado);
        }
        catch (err) {
            console.error('Erro ao executar a query de livro: ', err);
        }
    }
    async insereLivro(livro) {
        const resultado = await (0, mysql_1.executarComandoSQL)("INSERT INTO biblioteca.Livro (titulo, isbn, autor, editora, edicao, categoria, status) values (?,?,?,?,?,?,?)", [
            livro.titulo,
            livro.isbn,
            livro.autor,
            livro.editora,
            livro.edicao,
            livro.categoria,
            'disponivel'
        ]);
        console.log("Livro criado com Sucesso: ", resultado);
        return new LivroEntity_1.LivroEntity(livro.titulo, livro.isbn, livro.autor, livro.editora, livro.edicao, livro.categoria, 'disponivel');
    }
    validacaoISBN(isbn) {
        return isbn.toString().length === 13;
    }
    async filtraLivroPorISBN(isbn) {
        const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM biblioteca.Livro WHERE isbn = ?", [isbn]);
        if (resultado && resultado.length > 0) {
            const user = resultado[0];
            return new LivroEntity_1.LivroEntity(user.titulo, user.isbn, user.autor, user.editora, user.edicao, user.categoria, user.status);
        }
        return null;
    }
    async validacaoLivro(isbn) {
        const livro = await this.filtraLivroPorISBN(isbn);
        return livro !== null;
    }
    async removeLivroPorISBN(isbn) {
        const livro = await this.filtraLivroPorISBN(isbn);
        if (!livro) {
            return null;
        }
        await (0, mysql_1.executarComandoSQL)("DELETE FROM biblioteca.Livro where isbn = ?", [isbn]);
        return livro;
    }
    async atualizarLivroPorISBN(isbn, novosDados) {
        const campos = [];
        const valores = [];
        if (novosDados.titulo) {
            campos.push("titulo = ?");
            valores.push(novosDados.titulo);
        }
        if (novosDados.autor) {
            campos.push("autor = ?");
            valores.push(novosDados.autor);
        }
        if (novosDados.editora) {
            campos.push("editora = ?");
            valores.push(novosDados.editora);
        }
        if (novosDados.edicao) {
            campos.push("edicao = ?");
            valores.push(novosDados.edicao);
        }
        if (novosDados.categoria) {
            campos.push("categoria = ?");
            valores.push(novosDados.categoria);
        }
        if (novosDados.status) {
            campos.push("status = ?");
            valores.push(novosDados.status);
        }
        if (campos.length === 0) {
            return await this.filtraLivroPorISBN(isbn);
        }
        const sql = `UPDATE biblioteca.Livro SET ${campos.join(", ")} WHERE isbn = ?`;
        valores.push(isbn);
        const resultado = await (0, mysql_1.executarComandoSQL)(sql, valores);
        console.log(resultado);
        return await this.filtraLivroPorISBN(isbn);
    }
    async listarLivros() {
        const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM biblioteca.Livro", []);
        const livros = [];
        if (resultado && resultado.length > 0) {
            for (let i = 0; i < resultado.length; i++) {
                const user = resultado[i];
                livros.push(new LivroEntity_1.LivroEntity(user.titulo, user.isbn, user.autor, user.editora, user.edicao, user.categoria, user.status));
            }
        }
        return livros;
    }
}
exports.LivroRepository = LivroRepository;
