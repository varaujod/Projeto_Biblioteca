import { UsuarioEntity } from "../model/UsuarioEntity";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";
import { CategoriaCursoRepository } from "../repository/CategoriaCursoRepository";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";

export class UsuarioService{
    private usuarioRepository = UsuarioRepository.getInstance();
    private categoriaUsuarioRepository = CategoriaUsuarioRepository.getInstance();
    private categoriaCursoRepository = CategoriaCursoRepository.getInstance();
    private emprestimoRepository = EmprestimoRepository.getInstance();

    novoUsuario(data: any): UsuarioEntity{
        if(!data.nome || !data.cpf || !data.email || !data.email || !data.categoria || !data.curso){
            throw new Error("Por favor informar todos os campos");
        }

        if(!this.categoriaUsuarioRepository.encontrarCategoria(data.categoria)) {
            throw new Error("Por favor informar uma categoria existente");
        } 

        if(!this.categoriaCursoRepository.encontrarCurso(data.curso)){
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
        const emprestimosAtivos = this.emprestimoRepository.filtraEmprestimosAtivosDoUsuario(cpf);
        if (emprestimosAtivos.length > 0) {
            throw new Error("Usuário não pode ser removido pois possui empréstimos pendentes!");
        }
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