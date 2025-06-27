import { executarComandoSQL } from "../database/mysql";
import { UsuarioEntity } from "../model/UsuarioEntity";

export class UsuarioRepository{
    private static instance: UsuarioRepository;
    // private UsuarioList: UsuarioEntity[] = [];
    imprimeResult(err: any, result: any){   
        if(result != undefined){
            console.log("Dentro callback", result);
        }
    }

    async criarTable(){
        try{
            await executarComandoSQL(
                `CREATE TABLE IF NOT EXISTS biblioteca.Usuario(
                id INT AUTO_INCREMENT PRIMARY KEY, 
                nome VARCHAR(255) NOT NULL, 
                cpf DECIMAL(11) NOT NULL UNIQUE, 
                email VARCHAR(255) NOT NULL, 
                categoria VARCHAR(255) NOT NULL, 
                curso VARCHAR(255) NOT NULL, 
                status VARCHAR(20) NOT NULL,
                diasSuspensao DECIMAL(4),
                livrosAtrasados DECIMAL(4),
                diasAtraso DECIMAL(4)
                )`, [], this.imprimeResult);
        } catch (err) {
            console.error('Erro ao executar a query: ', err);
        }
    }

    private constructor() {}

    public static getInstance(): UsuarioRepository{
        if(!this.instance){
            this.instance = new UsuarioRepository();
        }
        return this.instance;
    }

    insereUsuario(usuario: UsuarioEntity){
        try{
            const resultado = executarComandoSQL(
                "INSERT INTO biblioteca.Usuario (nome, cpf, email, categoria, curso, status, diasSuspensao, livrosAtrasados, diasAtraso) values (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [
                    usuario.nome, 
                    usuario.cpf, 
                    usuario.email,  
                    usuario.categoria, 
                    usuario.curso,
                    usuario.status,
                    usuario.diasSuspensao,
                    usuario.livrosAtrasados,
                    usuario.diasAtraso], this.imprimeResult);
        
            console.log('Produto inserido com Sucesso: ', resultado);
        } catch(err: any){
            if(err.code === 'ER_DUP_ENTRY') {
                throw new Error('Já existe um usuário com este CPF.');
            } 
            throw new Error('Erro ao inserir usuário: '+ err);
        }
    }

    filtraUsuarioPorCPF(cpf: number){
        try {
            const resultado = executarComandoSQL(
                "SELECT * FROM biblioteca.Usuario WHERE cpf = ?",
                [cpf], this.imprimeResult);

            return resultado;
        } catch (err) {
            console.error('Erro ao consultar um usuario: ', err);
        }
        // return this.UsuarioList.find(usuario => usuario.cpf === cpf);
    }

    removeUsuarioPorCPF(cpf: number){
        try {
            const resultado = executarComandoSQL(
                "DELETE FROM biblioteca.Usuario WHERE cpf = ?",
                [cpf], this.imprimeResult);

            return resultado;

            // console.log('Usuário removido com sucesso:', resultado);
        } catch (err) {
        console.error('Erro ao remover usuário:', err);
        }
    }

    atualizarUsuarioPorCPF(cpf: number, novosDados: any) {
        try {
            const campos: string[] = [];
            const valores: any[] = [];

            if (novosDados.nome) {
                campos.push("nome = ?");
                valores.push(novosDados.nome);
            }

            if (novosDados.email) {
                campos.push("email = ?");
                valores.push(novosDados.email);
            }

            if (novosDados.categoria) {
                campos.push("categoria = ?");
                valores.push(novosDados.categoria);
            }

            if (novosDados.curso) {
                campos.push("curso = ?");
                valores.push(novosDados.curso);
            }

            if (novosDados.status) {
                campos.push("status = ?");
                valores.push(novosDados.status);
            }

            if (novosDados.diasSuspensao !== undefined) {
                campos.push("diasSuspensao = ?");
                valores.push(novosDados.diasSuspensao);
            }

            if (novosDados.livrosAtrasados !== undefined) {
                campos.push("livrosAtrasados = ?");
                valores.push(novosDados.livrosAtrasados);
            }

            if (novosDados.diasAtraso !== undefined) {
                campos.push("diasAtraso = ?");
                valores.push(novosDados.diasAtraso);
            }

            if (campos.length === 0) {
                throw new Error("Nenhum dado para atualizar.");
            }

            const sql = `UPDATE biblioteca.Usuario SET ${campos.join(", ")} WHERE cpf = ?`;
            valores.push(cpf);
            const resultado = executarComandoSQL(sql, valores, this.imprimeResult);

            return resultado;
            // console.log('Usuário atualizado com sucesso:', resultado);
        } catch (err) {
            console.error('Erro ao atualizar usuário:', err);
        }
    }

    listarUsuarios(): UsuarioEntity[]{
        try {
            const resultado = executarComandoSQL("SELECT * FROM biblioteca.Usuario", [], this.imprimeResult);
            return resultado as unknown as UsuarioEntity[];
        } catch (err) {
            console.error('Erro ao listar usuários:', err);
            return [];
        }
    }

    validacaoCadastro(cpf: number): boolean{
        return this.filtraUsuarioPorCPF(cpf) !== undefined;
    }

    // private findIndex(cpf: number): number{
    //     const index = this.UsuarioList.findIndex(user => user.cpf == cpf);

    //     if(index == -1){
    //         throw new Error("CPF informado não foi encontrado!");
    //     }

    //     return index;
    // }

}