"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioRepository = void 0;
const mysql_1 = require("../database/mysql");
const CategoriaUsuario_1 = require("../model/CategoriaUsuario");
class CategoriaUsuarioRepository {
    static instance;
    constructor() {
        this.criarTable();
        this.inserirCategoriasPadrao();
    }
    ;
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaUsuarioRepository();
        }
        return this.instance;
    }
    async criarTable() {
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.CategoriaUsuario(
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(100) NOT NULL
                )`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log('Tabela de categoria de usuarios criada com sucesso!', resultado);
        }
        catch (err) {
            console.error('Erro ao executar a query de estoque: ', err);
        }
    }
    async inserirCategoriasPadrao() {
        const categorias = ["Aluno", "Professor", "Bibliotecário"];
        await (0, mysql_1.executarComandoSQL)("DROP TABLE IF EXISTS biblioteca.CategoriaUsuario", []);
        await (0, mysql_1.executarComandoSQL)("CREATE TABLE IF NOT EXISTS biblioteca.CategoriaUsuario(id INT AUTO_INCREMENT PRIMARY KEY, nome VARCHAR(100) NOT NULL)", []);
        for (const nome of categorias) {
            try {
                const resultado = await (0, mysql_1.executarComandoSQL)("INSERT INTO biblioteca.CategoriaUsuario (nome) VALUES (?)", [nome]);
                console.log('Categoria criada com sucesso!', resultado);
            }
            catch (err) {
                console.error(`Erro ao inserir categoria ${nome}:`, err);
            }
        }
    }
    async listarCategoria() {
        const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM biblioteca.CategoriaUsuario", []);
        const categorias = [];
        if (resultado && resultado.length > 0) {
            for (let i = 0; i < resultado.length; i++) {
                const row = resultado[i];
                categorias.push(new CategoriaUsuario_1.CategoriaUsuario(row.id, row.nome));
            }
        }
        return categorias;
    }
    async encontrarCategoria(cat) {
        const query = `SELECT * FROM biblioteca.CategoriaUsuario WHERE nome = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [cat]);
        if (resultado && resultado.length > 0) {
            const row = resultado[0];
            return new CategoriaUsuario_1.CategoriaUsuario(row.id, row.nome);
        }
        return null;
    }
}
exports.CategoriaUsuarioRepository = CategoriaUsuarioRepository;
