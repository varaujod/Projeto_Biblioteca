"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaCursoRepository = void 0;
const mysql_1 = require("../database/mysql");
const CategoriaCurso_1 = require("../model/entity/CategoriaCurso");
class CategoriaCursoRepository {
    static instance;
    constructor() {
        this.criarTable();
        this.inserirCategoriasPadrao();
    }
    ;
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaCursoRepository();
        }
        return this.instance;
    }
    async criarTable() {
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.CategoriaCurso(
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(100) NOT NULL
            )`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log('Tabela de categoria de cursos criada com sucesso', resultado);
        }
        catch (err) {
            console.error('Erro ao executar a query de estoque: ', err);
        }
    }
    async inserirCategoriasPadrao() {
        const categorias = ["ADS", "Pedagogia", "Administração"];
        await (0, mysql_1.executarComandoSQL)("DROP TABLE IF EXISTS biblioteca.CategoriaCurso", []);
        await (0, mysql_1.executarComandoSQL)("CREATE TABLE IF NOT EXISTS biblioteca.CategoriaCurso(id INT AUTO_INCREMENT PRIMARY KEY, nome VARCHAR(100) NOT NULL)", []);
        for (const nome of categorias) {
            try {
                const resultado = await (0, mysql_1.executarComandoSQL)("INSERT IGNORE INTO biblioteca.CategoriaCurso (nome) values (?)", [nome]);
                console.log('Categoria criada com sucesso!', resultado);
            }
            catch (err) {
                console.error(`Erro ao inserir categoria ${nome}:`, err);
            }
        }
    }
    async listarCursos() {
        const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM biblioteca.CategoriaCurso", []);
        const categorias = [];
        if (resultado && resultado.length > 0) {
            for (let i = 0; i < resultado.length; i++) {
                const row = resultado[i];
                categorias.push(new CategoriaCurso_1.CategoriaCurso(row.id, row.nome));
            }
        }
        return categorias;
    }
    async encontrarCursos(cat) {
        const query = `SELECT * FROM biblioteca.CategoriaCurso WHERE nome = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [cat]);
        if (resultado && resultado.length > 0) {
            const row = resultado[0];
            return new CategoriaCurso_1.CategoriaCurso(row.id, row.nome);
        }
        return null;
    }
}
exports.CategoriaCursoRepository = CategoriaCursoRepository;
