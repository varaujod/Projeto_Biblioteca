"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoRepository = void 0;
const mysql_1 = require("../database/mysql");
const EmprestimoEntity_1 = require("../model/EmprestimoEntity");
class EmprestimoRepository {
    static instance;
    constructor() {
        this.createTable();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EmprestimoRepository();
        }
        return this.instance;
    }
    async createTable() {
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.Emprestimo(
                id INT AUTO_INCREMENT PRIMARY KEY,
                usuario DECIMAL(11) NOT NULL,
                codexemplar DECIMAL(13) NOT NULL,
                categoria VARCHAR(10) NOT NULL,
                dataemprestimo DATE NOT NULL,
                datadevolucao DATE,
                dataprevista DATE NOT NULL,
                diasrestantes INT NOT NULL,
                status VARCHAR(10) NOT NULL,
                multaatrasado INT,
                diassuspensao INT
                )`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log('Tabela de emprestimo criada com sucesso!', resultado);
        }
        catch (err) {
            console.error('Erro ao executar a query de estoque: ', err);
        }
    }
    async insereEmprestimo(emprestimo) {
        const resultado = await (0, mysql_1.executarComandoSQL)("INSERT INTO biblioteca.Emprestimo (usuario, codexemplar, categoria, dataemprestimo, datadevolucao, dataprevista, diasrestantes, status, multaatrasado, diassuspensao) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
            emprestimo.usuario,
            emprestimo.codExemplar,
            emprestimo.categoria,
            new Date(),
            null,
            emprestimo.calcularDataDevolucao(),
            emprestimo.diasRestantesEmprestimo(),
            'ativo',
            emprestimo.calcularDiasAtraso(),
            emprestimo.calcularDiasSuspensao()
        ]);
        console.log('Emprestimo feito com sucesso!', resultado);
        return new EmprestimoEntity_1.EmprestimoEntity(resultado.insertId, emprestimo.usuario, emprestimo.codExemplar, emprestimo.categoria);
    }
    async listarEmprestimos() {
        const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM biblioteca.Emprestimo", []);
        const emprestimos = [];
        // if (resultado && resultado.length > 0) {
        //     for (let i = 0; i < resultado.length; i++) {
        //         const user = resultado[i];
        //         const emprestimo = new EmprestimoEntity(
        //             user.id,
        //             user.usuario,
        //             user.codexemplar,
        //             user.categoria
        //         );
        //         emprestimo.dataEmprestimo;
        //         emprestimo.dataDevolucao;
        //         emprestimo.status;
        //         emprestimo.dataPrevista;
        //         emprestimo.diasRestantes;
        //         emprestimo.multaAtrasado;
        //         emprestimo.diasSuspensao;
        //         emprestimos.push(emprestimo);
        //     }
        // }
        if (resultado && resultado.length > 0) {
            for (const user of resultado) {
                // 1. Instancia com os campos obrigatórios
                const emprestimo = new EmprestimoEntity_1.EmprestimoEntity(user.id, user.usuario, user.codexemplar, user.categoria);
                // 2. Preenche os campos vindos do banco
                emprestimo.dataEmprestimo = new Date(user.dataemprestimo);
                emprestimo.dataDevolucao = user.datadevolucao ? new Date(user.datadevolucao) : null;
                emprestimo.status = user.status;
                // 3. Atualiza os campos calculados
                emprestimo.dataPrevista = emprestimo.calcularDataDevolucao();
                emprestimo.diasRestantes = emprestimo.diasRestantesEmprestimo();
                emprestimo.multaAtrasado = emprestimo.calcularDiasAtraso();
                emprestimo.diasSuspensao = emprestimo.calcularDiasSuspensao();
                emprestimos.push(emprestimo);
            }
        }
        return emprestimos;
    }
    async filtraEmprestimoPorID(id) {
        const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM biblioteca.Emprestimo where id = ?", [id]);
        if (resultado && resultado.lenght > 0) {
            const user = resultado[0];
            const emprestimo = new EmprestimoEntity_1.EmprestimoEntity(user.id, user.usuario, user.codexemplar, user.categoria);
            emprestimo.dataEmprestimo;
            emprestimo.dataDevolucao;
            emprestimo.status;
            emprestimo.dataPrevista;
            emprestimo.diasRestantes;
            emprestimo.multaAtrasado;
            emprestimo.diasSuspensao;
        }
        return null;
    }
    async filtraEmprestimosAtivosDoUsuario(usuario) {
        const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM biblioteca.Emprestimo WHERE usuario = ? AND status = 'ativo'", [usuario]);
        const emprestimos = [];
        if (resultado && resultado.length > 0) {
            for (const user of resultado) {
                const emprestimo = new EmprestimoEntity_1.EmprestimoEntity(user.id, user.usuario, user.codexemplar, user.categoria);
                emprestimo.dataEmprestimo = new Date(user.dataemprestimo);
                emprestimo.dataDevolucao = user.datadevolucao ? new Date(user.datadevolucao) : null;
                emprestimo.status = user.status;
                emprestimo.dataPrevista = emprestimo.calcularDataDevolucao();
                emprestimo.diasRestantes = emprestimo.diasRestantesEmprestimo();
                emprestimo.multaAtrasado = emprestimo.calcularDiasAtraso();
                emprestimo.diasSuspensao = emprestimo.calcularDiasSuspensao();
                emprestimos.push(emprestimo);
            }
        }
        return emprestimos;
    }
    async filtraEmprestimosAtrasadosDoUsuario(usuario) {
        const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM biblioteca.Emprestimo WHERE usuario = ? AND status = 'ativo'", [usuario]);
        const emprestimos = [];
        if (resultado && resultado.length > 0) {
            for (const user of resultado) {
                const emprestimo = new EmprestimoEntity_1.EmprestimoEntity(user.id, user.usuario, user.codexemplar, user.categoria);
                emprestimo.dataEmprestimo = new Date(user.dataemprestimo);
                emprestimo.dataDevolucao = user.datadevolucao ? new Date(user.datadevolucao) : null;
                emprestimo.status = user.status;
                emprestimo.dataPrevista = emprestimo.calcularDataDevolucao();
                emprestimo.diasRestantes = emprestimo.diasRestantesEmprestimo();
                emprestimo.multaAtrasado = emprestimo.calcularDiasAtraso();
                emprestimo.diasSuspensao = emprestimo.calcularDiasSuspensao();
                if (emprestimo.estaAtrasado()) {
                    emprestimos.push(emprestimo);
                }
            }
        }
        return emprestimos;
    }
    async emprestimosAtivosDoUsuario(usuario) {
        const emprestimos = await this.filtraEmprestimosAtivosDoUsuario(usuario);
        return emprestimos.length;
    }
    async verificarUsuarioSuspenso(usuario) {
        const emprestimosAtrasados = await this.filtraEmprestimosAtrasadosDoUsuario(usuario);
        return emprestimosAtrasados.some(emprestimo => emprestimo.calcularDiasAtraso() > 60);
    }
    async atualizarStatusEmprestimo(id, novoStatus) {
        let query = "UPDATE biblioteca.Emprestimo SET status = ?";
        const params = [novoStatus];
        if (novoStatus === 'devolvido') {
            query += ", datadevolucao = ?";
            params.push(new Date());
        }
        query += " WHERE id = ?";
        params.push(id);
        await (0, mysql_1.executarComandoSQL)(query, params);
    }
    async verificarLimiteEmprestimo(usuario, categoria) {
        const emprestimosAtivos = await this.emprestimosAtivosDoUsuario(usuario);
        let limiteEmprestimos = categoria === 'professor' ? 5 : 3;
        return emprestimosAtivos < limiteEmprestimos;
    }
    async listarEmprestimosAtivos() {
        const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM biblioteca.Emprestimo WHERE status = 'ativo'", []);
        const emprestimos = [];
        if (resultado && resultado.length > 0) {
            for (const user of resultado) {
                const emprestimo = new EmprestimoEntity_1.EmprestimoEntity(user.id, user.usuario, user.codexemplar, user.categoria);
                emprestimo.dataEmprestimo = new Date(user.dataemprestimo);
                emprestimo.dataDevolucao = user.datadevolucao ? new Date(user.datadevolucao) : null;
                emprestimo.status = user.status;
                emprestimo.dataPrevista = emprestimo.calcularDataDevolucao();
                emprestimo.diasRestantes = emprestimo.diasRestantesEmprestimo();
                emprestimo.multaAtrasado = emprestimo.calcularDiasAtraso();
                emprestimo.diasSuspensao = emprestimo.calcularDiasSuspensao();
                emprestimos.push(emprestimo);
            }
        }
        return emprestimos;
    }
}
exports.EmprestimoRepository = EmprestimoRepository;
