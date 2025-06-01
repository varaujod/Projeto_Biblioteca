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

    listarEmprestimo(){
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

    buscarEmprestimosAtrasadosDoUsuario(cpf: number): EmprestimoEntity[]{
        
    }
}