import { UsuarioEntity } from "../model/UsuarioEntity";

export class UsuarioRepository{
    private static instance: UsuarioRepository;
    private UsuarioList: UsuarioEntity[] = [];

    private constructor() {}

    public static getInstance(): UsuarioRepository{
        if(!this.instance){
            this.instance = new UsuarioRepository();
        }
        return this.instance;
    }

    insereUsuario(usuario: UsuarioEntity){
        this.UsuarioList.push(usuario);
    }

    filtraUsuarioPorCPF(cpf: number){
        return this.UsuarioList.find(usuario => usuario.cpf === cpf);
    }

    removeUsuarioPorCPF(cpf: number){
        const index = this.findIndex(cpf);
        this.UsuarioList.splice(index, 1);
    }

    atualizarUsuarioPorCPF(cpf: number, novosDados: any){
        const index = this.findIndex(cpf);
        const usuario = this.UsuarioList[index];

        if(novosDados.nome){
            usuario.nome = novosDados.nome
        }
        
        if(novosDados.email){
            usuario.email = novosDados.email
        }

        if(novosDados.categoria){
            usuario.categoria = novosDados.categoria
        }

        if(novosDados.curso){
            usuario.curso = novosDados.curso
        }

        this.UsuarioList[index] = usuario;

        return usuario;
    }

    listarUsuarios(): UsuarioEntity[]{
        return this.UsuarioList;
    }

    private findIndex(cpf: number): number{
        const index = this.UsuarioList.findIndex(user => user.cpf == cpf);

        if(index == -1){
            throw new Error("CPF informado não foi encontrado!");
        }

        return index;
    }

}