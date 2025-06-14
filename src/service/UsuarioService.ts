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
        const usuario = this.usuarioRepository.filtraUsuarioPorCPF(cpf);

        if(!usuario){
            throw new Error("Este usuário ainda não foi cadastrado com este CPF!");
        }

        return usuario;
    }

    removeUsuario(cpf: number){
        const emprestimosAtivos = this.emprestimoRepository.filtraEmprestimosAtivosDoUsuario(cpf);
        if (emprestimosAtivos.length > 0) {
            throw new Error("Usuário não pode ser removido pois possui empréstimos pendentes!");
        }
        return this.usuarioRepository.removeUsuarioPorCPF(cpf);
    }

    listarUsuarios(){
        return this.usuarioRepository.listarUsuarios()
    }

    atualizaUsuario(data: any){
        const cpf = data.cpf;
        const novosDados = data.novosDados;

        return this.usuarioRepository.atualizarUsuarioPorCPF(cpf, novosDados);
    }

    // private async atualizarStatusUsuarios(){
    //     const usuarios = this.listarUsuarios();
    //     const emprestimoRepository = EmprestimoRepository.getInstance();
        
    //     for(const usuario of usuarios){
    //         const emprestimosAtivos = emprestimoRepository.filtraEmprestimosAtivosDoUsuario(usuario.cpf);

    //         let livrosAtrasados = 0;
    //         let diasAtrasoTotal = 0;

    //         for(const emprestimo of emprestimo)

    //     }
    // }
}