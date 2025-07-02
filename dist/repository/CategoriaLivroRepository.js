"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroRepository = void 0;
const mysql_1 = require("../database/mysql");
const CategoriaLivro_1 = require("../model/CategoriaLivro");
class CategoriaLivroRepository {
    static instance;
    constructor() {
        this.criarTable();
        this.inserirCategoriasPadrao();
    }
    ;
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaLivroRepository();
        }
        return this.instance;
    }
    async criarTable() {
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.CategoriaLivro(
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(100) NOT NULL
                )`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log('Tabela de categoria de livros foi criada com sucesso!', resultado);
        }
        catch (err) {
            console.error('Erro ao executar a query de estoque: ', err);
        }
    }
    async inserirCategoriasPadrao() {
        const categorias = ["Romance", "Computação", "Letras", "Gestão"];
        await (0, mysql_1.executarComandoSQL)("DROP TABLE IF EXISTS biblioteca.CategoriaLivro", []);
        await (0, mysql_1.executarComandoSQL)("CREATE TABLE IF NOT EXISTS biblioteca.CategoriaLivro(id INT AUTO_INCREMENT PRIMARY KEY, nome VARCHAR(100) NOT NULL)", []);
        for (const nome of categorias) {
            try {
                const resultado = await (0, mysql_1.executarComandoSQL)("INSERT IGNORE INTO biblioteca.CategoriaLivro (nome) values (?)", [nome]);
                console.log('Categoria criada com sucesso!', resultado);
            }
            catch (err) {
                console.error(`Erro ao inserir categoria ${nome}:`, err);
            }
        }
    }
    async listarCategoriasLivro() {
        const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM biblioteca.CategoriaLivro", []);
        const categorias = [];
        if (resultado && resultado.length > 0) {
            for (let i = 0; i < resultado.length; i++) {
                const row = resultado[i];
                categorias.push(new CategoriaLivro_1.CategoriaLivro(row.id, row.nome));
            }
        }
        return categorias;
    }
    async encontrarCategoriaLivro(liv) {
        const query = `SELECT * FROM biblioteca.CategoriaLivro WHERE nome = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [liv]);
        if (resultado && resultado.length > 0) {
            const row = resultado[0];
            return new CategoriaLivro_1.CategoriaLivro(row.id, row.nome);
        }
        return null;
    }
}
exports.CategoriaLivroRepository = CategoriaLivroRepository;
