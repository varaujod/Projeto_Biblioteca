"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoRepository = void 0;
class EmprestimoRepository {
    static instance;
    EmprestimoList = [];
    ultimoId = 0;
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EmprestimoRepository();
        }
        return this.instance;
    }
    insereEmprestimo(emprestimo) {
        this.EmprestimoList.push(emprestimo);
    }
    listarEmprestimos() {
        return this.EmprestimoList;
    }
    filtraEmprestimoPorID(id) {
        return this.EmprestimoList.find(emprestimo => emprestimo.id === id);
    }
    filtraEmprestimosAtivosDoUsuario(usuario) {
        return this.EmprestimoList.filter(emprestimo => emprestimo.usuario === usuario && emprestimo.status === 'ativo');
    }
    filtraEmprestimosAtrasadosDoUsuario(cpf) {
        return this.EmprestimoList.filter(emprestimo => emprestimo.usuario === cpf && emprestimo.status === 'ativo' && emprestimo.estaAtrasado());
    }
    filtraEmprestimoAtivoDoExemplar(codExemplar) {
        return this.EmprestimoList.find(emprestimo => emprestimo.codExemplar === codExemplar && emprestimo.status === 'ativo');
    }
    emprestimosAtivosDoUsuario(cpf) {
        return this.filtraEmprestimosAtivosDoUsuario(cpf).length;
    }
    verificarUsuarioSuspenso(cpf) {
        const emprestimosAtrasados = this.filtraEmprestimosAtrasadosDoUsuario(cpf);
        return emprestimosAtrasados.some(emprestimo => emprestimo.calcularDiasAtraso() > 60);
    }
    atualizarStatusEmprestimo(id, novoStatus) {
        const emprestimo = this.filtraEmprestimoPorID(id);
        if (emprestimo) {
            emprestimo.status = novoStatus;
            if (novoStatus === 'devolvido') {
                emprestimo.finalizarEmprestimo();
            }
        }
    }
    gerarNovoId() {
        this.ultimoId++;
        return this.ultimoId;
    }
    filtraHistoricoEmprestimosDoUsuario(cpf) {
        return this.EmprestimoList.filter(emprestimo => emprestimo.usuario === cpf);
    }
    filtraEmprestimosFinalizadosDoUsuario(cpf) {
        return this.EmprestimoList.filter(emprestimo => emprestimo.usuario === cpf && emprestimo.status === 'devolvido');
    }
    verificarLimiteEmprestimo(cpf, categoria) {
        const emprestimosAtivos = this.emprestimosAtivosDoUsuario(cpf);
        let limiteEmprestimos = 0;
        if (categoria === 'professor') {
            limiteEmprestimos = 5;
        }
        limiteEmprestimos = 3;
        return emprestimosAtivos < limiteEmprestimos;
    }
    filtraEmprestimosAtrasados() {
        return this.EmprestimoList.filter(emprestimo => emprestimo.status === 'ativo' && emprestimo.estaAtrasado());
    }
}
exports.EmprestimoRepository = EmprestimoRepository;
