import { UsuarioEntity } from "../model/UsuarioEntity";
import { UsuarioRepository } from "../repository/UsuarioRepository";

export class UsuarioService{
    private usuarioRepository = UsuarioRepository.getInstance();

    novoUsuario(data: any): UsuarioEntity{
        if(!data.nome || !data.cpf || !data.email || !data.email || !data.categoria || !data.curso){
            throw new Error("Por favor informar todos os campos");
        }

        if(data.categoria != "Aluno" || "Professor" || "Bibliotecario"){
            throw new Error("Por favor informar uma categoria existente");
        }

        if(data.curso != "ADS" || "Pedagogia" || "Administração"){
            throw new Error("Por favor informar um curso existente");
        }

        const usuario = new UsuarioEntity(data.nome, data.cpf, data.email, data.categoria, data.curso);

        this.usuarioRepository.insereUsuario(usuario);

        return usuario;
    }

    filtrarUsuario(data: any){
        const cpf = data.cpf;
        this.usuarioRepository.filtraUsuarioPorCPF(cpf);
    }

    removeUsuario(data: any){
        const cpf = data.cpf;
        this.usuarioRepository.removeUsuarioPorCPF(cpf);
    }

    listarUsuarios(){
        this.usuarioRepository.listarUsuarios();
    }
}