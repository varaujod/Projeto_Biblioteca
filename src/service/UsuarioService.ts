import { UsuarioEntity } from "../model/UsuarioEntity";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";

export class UsuarioService{
    private usuarioRepository = UsuarioRepository.getInstance();
    private categoriaUsuarioRepository = CategoriaUsuarioRepository.getInstance();

    novoUsuario(data: any): UsuarioEntity{
        if(!data.nome || !data.cpf || !data.email || !data.email || !data.categoria || !data.curso){
            throw new Error("Por favor informar todos os campos");
        }

        if(!this.categoriaUsuarioRepository.encontrarCategoria(data.categoria)) {
            throw new Error("Por favor informar uma categoria existente");
        } 

        if(data.curso != "ADS" && data.curso != "Pedagogia" &&  data.curso != "Administração"){
            throw new Error("Por favor informar um curso existente");
        }

        if(this.usuarioRepository.validacaoCadastro(data.cpf)){
            throw new Error("Este usuário já é cadastrado!");
        } else{
            const usuario = new UsuarioEntity(data.nome, data.cpf, data.email, data.categoria, data.curso);

            this.usuarioRepository.insereUsuario(usuario);

            return usuario;
        }
    }

    filtrarUsuario(data: any){
        const cpf = data.cpf;
        return this.usuarioRepository.filtraUsuarioPorCPF(cpf);
        // console.log(this.usuarioRepository.filtraUsuarioPorCPF(cpf));
    }

    removeUsuario(cpf: number){
        return this.usuarioRepository.removeUsuarioPorCPF(cpf);
    }

    listarUsuarios(){
        // console.log(this.usuarioRepository.listarUsuarios());
        return this.usuarioRepository.listarUsuarios()
    }

    atualizaUsuario(data: any){
        const cpf = data.cpf;
        const novosDados = data.novosDados;

        return this.usuarioRepository.atualizarUsuarioPorCPF(cpf, novosDados);
    }
}