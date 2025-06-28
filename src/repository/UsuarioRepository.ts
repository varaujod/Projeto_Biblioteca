import { executarComandoSQL } from "../database/mysql";
import { UsuarioEntity } from "../model/UsuarioEntity";

export class UsuarioRepository{
    private static instance: UsuarioRepository;

    private constructor() {
        this.criarTable()
    }

    public static getInstance(): UsuarioRepository{
        if(!this.instance){
            this.instance = new UsuarioRepository();
        }
        return this.instance;
    }
    
    private async criarTable(){
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.Usuario(
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
                )`
        try{
            const resultado = await executarComandoSQL(query, []);
            console.log('Tabela criada com Sucesso!', resultado);
        } catch(err){
            console.error('Erro ao executar a query: ', err);
        }
    }

    async insereUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity>{
        const resultado = await executarComandoSQL(
            "INSERT INTO biblioteca.Usuario (nome, cpf, email, categoria, curso, status, diasSuspensao, livrosAtrasados, diasAtraso) values (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                usuario.nome, 
                usuario.cpf, 
                usuario.email,  
                usuario.categoria, 
                usuario.curso,
                'ativo',
                0,
                0,
                0]);
        
        console.log('Produto inserido com Sucesso: ', resultado);
        return new UsuarioEntity(
                usuario.nome, 
                usuario.cpf, 
                usuario.email,  
                usuario.categoria, 
                usuario.curso);
    }

    async filtraUsuarioPorCPF(cpf: number): Promise<UsuarioEntity | null>{
        const resultado = await executarComandoSQL("SELECT * FROM biblioteca.Usuario WHERE cpf = ?", [cpf]);
        if (resultado && resultado.length > 0) {
            const user = resultado[0];
            return new UsuarioEntity(
                user.nome,
                user.cpf,
                user.email,
                user.categoria,
                user.curso
            );
        }
    return null;
    }

    async removeUsuarioPorCPF(cpf: number): Promise<UsuarioEntity | null>{
        const usuario = await this.filtraUsuarioPorCPF(cpf);
        if (!usuario) {
            return null;
        }

        await executarComandoSQL("DELETE FROM biblioteca.Usuario WHERE cpf = ?", [cpf]);

        return usuario;

    }

    async atualizarUsuarioPorCPF(cpf: number, novosDados: any): Promise<UsuarioEntity | null> {
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

        const resultado = await executarComandoSQL(sql, valores);
        console.log(resultado);

        const usuarioAtualizado = await this.filtraUsuarioPorCPF(cpf);
        return usuarioAtualizado;

    }

    async listarUsuarios(): Promise<UsuarioEntity[]>{
        const resultado = await executarComandoSQL("SELECT * FROM biblioteca.Usuario", []);
        const usuarios: UsuarioEntity[] = [];
        if(resultado && resultado.length > 0) {
            for (let i = 0; i < resultado.length; i++) {
                const user = resultado[i];
                usuarios.push(new UsuarioEntity(
                    user.nome,
                    user.cpf,
                    user.email,
                    user.categoria,
                    user.curso
                ));
            }
        }
        return usuarios;
    }

    async validacaoCadastro(cpf: number): Promise<boolean | null>{
        const resultado = await this.filtraUsuarioPorCPF(cpf);

        return resultado && resultado.length > 0;
    }

    // private findIndex(cpf: number): number{
    //     const index = this.UsuarioList.findIndex(user => user.cpf == cpf);

    //     if(index == -1){
    //         throw new Error("CPF informado não foi encontrado!");
    //     }

    //     return index;
    // }

}