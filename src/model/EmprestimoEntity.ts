import { UsuarioEntity } from "./UsuarioEntity";

export class EmprestimoEntity{
    id: number;
    usuario: number;
    codExemplar: number;
    categoria: 'professor' | 'aluno';
    areaDoCurso: boolean;
    dataEmprestimo: Date;
    dataDevolucao: Date | null;
    dataPrevista: Date;
    status: 'ativo' | 'devolvido' | 'atrasado';
    multaAtrasado: number;
    diasSuspensao: number;

    constructor(id: number, usuario: number, codExemplar: number, categoria: 'aluno' | 'professor', areaDoCurso: boolean = false){
        this.id = id;
        this.usuario = usuario;
        this.codExemplar = codExemplar;
        this.categoria = categoria;
        this.areaDoCurso = areaDoCurso;
        this.dataEmprestimo = new Date();
        this.dataPrevista = this.calcularDataDevolucao();
        this.dataDevolucao = null;
        this.status = 'ativo';
        this.multaAtrasado = 0;
        this.diasSuspensao = 0;
    }

    private calcularDataDevolucao(): Date{
        const dataPrevista = new Date(this.dataEmprestimo);
        let diasEmprestimo: number;

        if(this.categoria === 'professor'){
            diasEmprestimo = 40;
        } else{
            diasEmprestimo = 15;
        }

        dataPrevista.setDate(this.dataEmprestimo.getDate() + diasEmprestimo);
        return dataPrevista;
    }

    calcularDiasAtraso(): number{
        if(this.status != 'devolvido' || !this.dataDevolucao){
            const hoje = new Date();

            if(hoje > this.dataPrevista){
                const diferencaTime = hoje.getTime() - this.dataPrevista.getTime();
                return Math.floor(diferencaTime / (1000 * 60 * 60 * 24));
            }

            return 0;
        }

        const diferencaTime = this.dataDevolucao.getTime() - this.dataPrevista.getTime();
        const diferencaDias = Math.floor(diferencaTime / (1000 * 60 * 60 * 24));

        if(diferencaDias > 0){
            return diferencaDias;
        } else{
            return 0;
        }
    }

    calcularDiasSuspensao(): number{
        const diasAtraso = this.calcularDiasAtraso();
        this.diasSuspensao = diasAtraso * 3;

        return this.diasSuspensao;
    }

    finalizarEmprestimo(): void{
        this.dataDevolucao = new Date();
        this.status = 'devolvido';
        this.calcularDiasSuspensao();
    }

    estaAtrasado(): boolean {
        return this.calcularDiasAtraso() > 0;
    }

    diasRestantes(): number {
        if (this.status === 'devolvido') return 0;
        
        const hoje = new Date();
        const diffTime = this.dataPrevista.getTime() - hoje.getTime();
        const diffDias = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDias > 0 ? diffDias : 0;
    }
}