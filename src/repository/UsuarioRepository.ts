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

        this.UsuarioList.slice(index, 1);
    }

    listarUsuarios(): UsuarioEntity[]{
        return this.UsuarioList;
    }

    private findIndex(cpf: number): number{
        const index = this.UsuarioList.findIndex(user => user.cpf == cpf);

        if(index == -1){
            throw new Error("CPF informado não foi encontardo!");
        }

        return index;
    }

}