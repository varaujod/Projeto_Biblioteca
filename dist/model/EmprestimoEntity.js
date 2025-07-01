"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoEntity = void 0;
class EmprestimoEntity {
    id;
    usuario;
    codExemplar;
    categoria;
    dataEmprestimo;
    dataDevolucao;
    dataPrevista;
    diasRestantes;
    status;
    multaAtrasado;
    diasSuspensao;
    constructor(id, usuario, codExemplar, categoria) {
        if (!usuario || !codExemplar || !categoria) {
            throw new Error("Por favor informar todos os campos");
        }
        this.id = id ?? 0;
        this.usuario = usuario;
        this.codExemplar = codExemplar;
        this.categoria = categoria;
        this.dataEmprestimo = new Date();
        this.dataPrevista = this.calcularDataDevolucao();
        this.diasRestantes = this.diasRestantesEmprestimo();
        this.dataDevolucao = null;
        this.status = 'ativo';
        this.multaAtrasado = this.calcularDiasAtraso();
        this.diasSuspensao = this.calcularDiasSuspensao();
    }
    calcularDataDevolucao() {
        const dataPrevista = new Date(this.dataEmprestimo);
        let diasEmprestimo;
        if (this.categoria === 'professor') {
            diasEmprestimo = 40;
        }
        else {
            diasEmprestimo = 15;
        }
        dataPrevista.setDate(this.dataEmprestimo.getDate() + diasEmprestimo);
        return dataPrevista;
    }
    calcularDiasAtraso() {
        if (this.status != 'devolvido' || !this.dataDevolucao) {
            const hoje = new Date();
            if (hoje > this.dataPrevista) {
                const diferencaTime = hoje.getTime() - this.dataPrevista.getTime();
                return Math.floor(diferencaTime / (1000 * 60 * 60 * 24));
            }
            return 0;
        }
        const diferencaTime = this.dataDevolucao.getTime() - this.dataPrevista.getTime();
        const diferencaDias = Math.floor(diferencaTime / (1000 * 60 * 60 * 24));
        if (diferencaDias > 0) {
            return diferencaDias;
        }
        else {
            return 0;
        }
    }
    calcularDiasSuspensao() {
        const diasAtraso = this.calcularDiasAtraso();
        this.diasSuspensao = diasAtraso * 3;
        return this.diasSuspensao;
    }
    finalizarEmprestimo() {
        this.dataDevolucao = new Date();
        this.status = 'devolvido';
        this.calcularDiasSuspensao();
    }
    estaAtrasado() {
        return this.calcularDiasAtraso() > 0;
    }
    diasRestantesEmprestimo() {
        if (this.status === 'devolvido') {
            return 0;
        }
        const hoje = new Date();
        const diferencaTime = this.dataPrevista.getTime() - hoje.getTime();
        const diferencaDias = Math.ceil(diferencaTime / (1000 * 60 * 60 * 24));
        if (diferencaDias > 0) {
            return diferencaDias;
        }
        else {
            return 0;
        }
    }
}
exports.EmprestimoEntity = EmprestimoEntity;
