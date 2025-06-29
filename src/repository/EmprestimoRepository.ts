import { executarComandoSQL } from "../database/mysql";
import { EmprestimoEntity } from "../model/EmprestimoEntity";

export class EmprestimoRepository{
    private static instance: EmprestimoRepository;

    private constructor() {
        this.createTable();
    }

    public static getInstance(): EmprestimoRepository{
        if(!this.instance){
            this.instance = new EmprestimoRepository();
        }

        return this.instance;
    }

    private async createTable(){
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.Emprestimo(
                id INT AUTO_INCREMENT PRIMARY KEY,
                usuario DECIMAL(11) NOT NULL,
                codexemplar DECIMAL(13) NOT NULL,
                categoria VARCHAR(10) NOT NULL,
                dataemprestimo DATE NOT NULL,
                datadevolucao DATE NOT NULL,
                dataprevista DATE NOT NULL,
                diasrestantes DATE NOT NULL,
                status VARCHAR(10) NOT NULL,
                multaatrasado INT,
                diassuspensao INT
                )`

        try{
            const resultado = await executarComandoSQL(query, []);
            console.log('Tabela de emprestimo criada com sucesso!', resultado);
        } catch(err){
            console.error('Erro ao executar a query de estoque: ', err);
        }
    }

    async insereEmprestimo(emprestimo: EmprestimoEntity): Promise<EmprestimoEntity>{
        const resultado = await executarComandoSQL(
            "INSERT INTO biblioteca.Emprestimo (usuario, codexemplar, categoria, dataemprestimo, datadevolucao, dataprevista, diasrestantes, status, multaatrasado, diasrestantes) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?",
            [
                emprestimo.usuario,
                emprestimo.codExemplar,
                emprestimo.categoria,
                emprestimo.dataEmprestimo,
                emprestimo.dataDevolucao,
                emprestimo.dataPrevista,
                emprestimo.diasRestantes,
                'ativo',
                emprestimo.multaAtrasado,
                emprestimo.diasSuspensao
            ]);

        console.log('Emprestimo feito com sucesso!', resultado);
        return new EmprestimoEntity(
            resultado.insertId,
            emprestimo.usuario,
            emprestimo.codExemplar,
            emprestimo.categoria
        )
    }

    async listarEmprestimos(): Promise<EmprestimoEntity[]>{
        const resultado = await executarComandoSQL("SELECT * FROM biblioteca.Emprestimo", []);
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

    verificarLimiteEmprestimo(cpf: number, categoria: 'professor' | 'aluno'): boolean{
        const emprestimosAtivos = this.emprestimosAtivosDoUsuario(cpf);
        let limiteEmprestimos = 0;

        if(categoria === 'professor'){
            limiteEmprestimos = 5;
        } else {
            limiteEmprestimos = 3;
        }

        return emprestimosAtivos < limiteEmprestimos;
    }

    listarEmprestimosAtivos(){
        return this.EmprestimoList.filter(
            emprestimo => emprestimo.status === 'ativo'
        );
    }
}