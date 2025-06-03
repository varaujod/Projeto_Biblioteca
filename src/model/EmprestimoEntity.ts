export class EmprestimoEntity{
    static ultimoId: number = 0;

    id: number;
    usuario: number;
    codExemplar: number;
    categoria: 'professor' | 'aluno';
    dataEmprestimo: Date;
    dataDevolucao: Date | null;
    dataPrevista: Date;
    status: 'ativo' | 'devolvido' | 'atrasado';
    multaAtrasado: number;
    diasSuspensao: number;

    constructor(usuario: number, codExemplar: number, categoria: 'aluno' | 'professor'){
        this.id = this.gerarId();
        this.usuario = usuario;
        this.codExemplar = codExemplar;
        this.categoria = categoria;
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
        if (this.status === 'devolvido') {
            return 0;
        }

        const hoje = new Date();
        const diferencaTime = this.dataPrevista.getTime() - hoje.getTime();
        const diferencaDias = Math.floor(diferencaTime / (1000 * 60 * 60 * 24));

        if(diferencaDias > 0){
            return diferencaDias;
        } else{
            return 0;
        }
    }

    gerarId(): number{
        EmprestimoEntity.ultimoId++;
        return EmprestimoEntity.ultimoId;
    }


}
