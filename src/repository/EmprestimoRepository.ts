import { EmprestimoEntity } from "../model/EmprestimoEntity";

export class EmprestimoRepository{
    private static instance: EmprestimoRepository;
    private EmprestimoList: EmprestimoEntity[] = [];
    private ultimoId: number = 0;

    private constructor() {}

    public static getInstance(): EmprestimoRepository{
        if(!this.instance){
            this.instance = new EmprestimoRepository();
        }

        return this.instance;
    }

    insereEmprestimo(emprestimo: EmprestimoEntity){
        this.EmprestimoList.push(emprestimo);
    }

    listarEmprestimos(){
        return this.EmprestimoList;
    }

    filtraEmprestimoPorID(id: number){
        return this.EmprestimoList.find(emprestimo => emprestimo.id === id);
    }

    filtraEmprestimosAtivosDoUsuario(usuario: number){
        return this.EmprestimoList.filter(
            emprestimo => emprestimo.usuario === usuario && emprestimo.status === 'ativo'
        );
    }

    filtraEmprestimosAtrasadosDoUsuario(cpf: number): EmprestimoEntity[]{
        return this.EmprestimoList.filter(
            emprestimo => emprestimo.usuario === cpf && emprestimo.status === 'ativo' && emprestimo.estaAtrasado()
        );
    }

    filtraEmprestimoAtivoDoExemplar(codExemplar: number): EmprestimoEntity | undefined {
        return this.EmprestimoList.find(
            emprestimo => emprestimo.codExemplar === codExemplar && emprestimo.status === 'ativo'
        );
    }

    emprestimosAtivosDoUsuario(cpf: number): number {
        return this.filtraEmprestimosAtivosDoUsuario(cpf).length;
    }

    verificarUsuarioSuspenso(cpf: number): boolean{
        const emprestimosAtrasados = this.filtraEmprestimosAtrasadosDoUsuario(cpf);
        return emprestimosAtrasados.some(emprestimo => emprestimo.calcularDiasAtraso() > 60);
    }

    atualizarStatusEmprestimo(id: number, novoStatus: 'ativo' | 'devolvido' | 'atrasado'): void{
        const emprestimo = this.filtraEmprestimoPorID(id);

        if(emprestimo){
            emprestimo.status = novoStatus;

            if(novoStatus === 'devolvido'){
                emprestimo.finalizarEmprestimo();
            }
        }
    }

    gerarNovoId(): number{
        this.ultimoId++;
        return this.ultimoId;
    }

    deletarEmprestimo(id: number): boolean{
        const index = this.EmprestimoList.findIndex(emprestimo => emprestimo.id === id);

        if(index !== -1){
            this.EmprestimoList.splice(index, 1);
            return true;
        }

        return false;
    }

    filtraHistoricoEmprestimosDoUsuario(cpf: number): EmprestimoEntity[]{
        return this.EmprestimoList.filter(emprestimo => emprestimo.usuario === cpf)
    }

    filtraEmprestimosFinalizadosDoUsuario(cpf: number): EmprestimoEntity[]{
        return this.EmprestimoList.filter(
            emprestimo => emprestimo.usuario === cpf && emprestimo.status === 'devolvido'
        );
    }

    verificarLimiteEmprestimo(cpf: number, categoria: 'professor' | 'aluno'): boolean{
        const emprestimosAtivos = this.emprestimosAtivosDoUsuario(cpf);
        let limiteEmprestimos = 0;

        if(categoria === 'professor'){
            limiteEmprestimos = 5;
        }

        limiteEmprestimos = 3;

        return emprestimosAtivos < limiteEmprestimos;
    }

    filtraEmprestimosAtrasados(): EmprestimoEntity[]{
        return this.EmprestimoList.filter(
            emprestimo => emprestimo.status === 'ativo' && emprestimo.estaAtrasado()
        );
    }
}