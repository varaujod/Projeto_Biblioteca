"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueRepository = void 0;
const EstoqueEntity_1 = require("../model/EstoqueEntity");
const mysql_1 = require("../database/mysql");
class EstoqueRepository {
    static instance;
    constructor() {
        this.createTable();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EstoqueRepository();
        }
        return this.instance;
    }
    async createTable() {
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.Estoque(
                id INT AUTO_INCREMENT PRIMARY KEY,
                isbn DECIMAL(13) NOT NULL,
                quantidade DECIMAL(10) NOT NULL,
                quantidade_emprestada DECIMAL(10) NOT NULL,
                disponibilidade VARCHAR(15) NOT NULL
                )`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log('Tabela de estoque criada com sucesso!', resultado);
        }
        catch (err) {
            console.error('Erro ao executar a query de estoque: ', err);
        }
    }
    async insereLivroNoEstoque(livro) {
        const resultado = await (0, mysql_1.executarComandoSQL)("INSERT INTO biblioteca.Estoque (isbn, quantidade, quantidade_emprestada, disponibilidade) values (?, ?, ?, ?)", [
            livro.isbn,
            livro.quantidade,
            0,
            'disponivel'
        ]);
        console.log('Livro adicionado com sucesso no estoque!', resultado);
        const entity = new EstoqueEntity_1.EstoqueEntity(resultado.insertId, livro.isbn, livro.quantidade, livro.quantidade_emprestada);
        entity.disponibilidade = 'disponivel';
        return entity;
    }
    async filtraLivroNoEstoque(id) {
        const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM biblioteca.Estoque where id = ?", [id]);
        if (resultado && resultado.length > 0) {
            const user = resultado[0];
            const entity = new EstoqueEntity_1.EstoqueEntity(user.id, user.isbn, Number(user.quantidade), Number(user.quantidade_emprestada));
            entity.disponibilidade = user.disponibilidade;
            return entity;
        }
        return null;
    }
    async listarEstoque() {
        const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM biblioteca.Estoque", []);
        const estoque = [];
        if (resultado && resultado.length > 0) {
            for (let i = 0; i < resultado.length; i++) {
                const user = resultado[i];
                const entity = new EstoqueEntity_1.EstoqueEntity(user.id, user.isbn, Number(user.quantidade), Number(user.quantidade_emprestada));
                entity.disponibilidade = user.disponibilidade;
                estoque.push(entity);
            }
        }
        return estoque;
    }
    async atualizarDisponibilidade(id, dados) {
        const campos = [];
        const valores = [];
        if (dados.disponibilidade) {
            campos.push("disponibilidade = ?");
            valores.push(dados.disponibilidade);
        }
        if (dados.quantidade_emprestada !== undefined) {
            campos.push("quantidade_emprestada = ?");
            valores.push(dados.quantidade_emprestada);
        }
        if (campos.length === 0) {
            throw new Error("Nenhum dado para atualizar.");
        }
        const sql = `UPDATE biblioteca.Estoque SET ${campos.join(", ")} WHERE id = ?`;
        valores.push(id);
        await (0, mysql_1.executarComandoSQL)(sql, valores);
        return await this.filtraLivroNoEstoque(id);
    }
    async removerLivroNoEstoque(id) {
        const livro = await this.filtraLivroNoEstoque(id);
        if (livro?.disponibilidade == 'disponivel') {
            await (0, mysql_1.executarComandoSQL)("DELETE FROM biblioteca.Estoque WHERE id = ?", [id]);
            return livro;
        }
        else {
            throw new Error("Este livro não pode ser excluido, assim que estiver disponivel, você poderá excluir!");
        }
    }
    async quantidadeLivrosEmprestados(id) {
        const livro = await this.filtraLivroNoEstoque(id);
        return livro?.id === Number(id) && livro?.quantidade_emprestada > 0;
    }
}
exports.EstoqueRepository = EstoqueRepository;
