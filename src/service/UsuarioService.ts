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

    async novoUsuario(data: any): Promise<UsuarioEntity>{
        if(!this.categoriaUsuarioRepository.encontrarCategoria(data.categoria)) {
            throw new Error("Por favor informar uma categoria existente");
        } 

        if(!this.categoriaCursoRepository.encontrarCurso(data.curso)){
            throw new Error("Por favor informar um curso existente");
        }
        const usuarioEncontrado = await this.usuarioRepository.validacaoCadastro(data.cpf)

        if(usuarioEncontrado){
            throw new Error("Este usuário já é cadastrado!");
        }
                
        return await this.usuarioRepository.insereUsuario(data);
    }


    filtrarUsuario(data: any): Promise<UsuarioEntity | null>{
        const cpf = data.cpf;
        const usuario = this.usuarioRepository.filtraUsuarioPorCPF(cpf);

        if(usuario === null){
            throw new Error("Este usuário ainda não foi cadastrado com este CPF!");
        }

        return usuario;
    }

    async removeUsuario(cpf: number): Promise<UsuarioEntity>{
        const emprestimosAtivos = this.emprestimoRepository.filtraEmprestimosAtivosDoUsuario(cpf);
        if ((await emprestimosAtivos).length > 0) {
            throw new Error("Usuário não pode ser removido pois possui empréstimos pendentes!");
        }

        const usuarioRemovido = await this.usuarioRepository.removeUsuarioPorCPF(cpf);
        if(!usuarioRemovido){
            throw new Error("Usuário não encontrado para remoção!");
        }
        return usuarioRemovido;
    }

    async listarUsuarios(): Promise<UsuarioEntity[]>{
        return await this.usuarioRepository.listarUsuarios();
    }

    async atualizaUsuario(data: any): Promise<UsuarioEntity | null>{
        const cpf = data.cpf;
        const novosDados = data.novosDados;

        return await this.usuarioRepository.atualizarUsuarioPorCPF(cpf, novosDados);
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