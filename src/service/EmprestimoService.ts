import { EmprestimoEntity } from "../model/EmprestimoEntity";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";

export class EmprestimoService{
    private emprestimoRespository = EmprestimoRepository.getInstance();
    private usuarioRepository = UsuarioRepository.getInstance();
    private estoqueRepository = EstoqueRepository.getInstance();

    novoEmprestimo(data: any): EmprestimoEntity{
        if(!data.id || !data.usuario || !data.codExemplar || !data.categoria || !data.areaDoCurso){
            throw new Error("Por favor informar todos os campos");
        }
        
        const usuario = this.usuarioRepository.filtraUsuarioPorCPF(data.usuario);

        if(!usuario){
            throw new Error("Usuário não encontrado!");
        }

        if(usuario.status != 'ativo'){
            throw new Error("Usuário não está ativo para realizar empréstimos!");
        }

        if(this.emprestimoRespository.verificarUsuarioSuspenso(data.usuario)){
            throw new Error("Usuário possui empréstimos em atraso!");
        }

        const exemplar = this.estoqueRepository.filtraLivroNoEstoque(data.codExemplar);

        if(!exemplar){
            throw new Error("Exemplar não encontrado!");
        }

        if(!exemplar.disponibilidade){
            throw new Error("Este exemplar não está disponível para empréstimo!");
        }

        let categoria: 'professor' | 'aluno';

        if(usuario.categoria == 'professor'){
            categoria = 'professor';
        } else{
            categoria = 'aluno';
        }

        if(!this.emprestimoRespository.verificarLimiteEmprestimo(data.usuario, categoria)){
            let limite = 0;

            if(categoria === 'professor'){
                limite = 5
            } else{
                limite = 3;
            }

            throw new Error(`Usuário já atingiu o limite máximo de ${limite} empréstimos simultâneos!`);
        }

        const emprestimoAtivo = this.emprestimoRespository.filtraEmprestimoAtivoDoExemplar(data.codExemplar);

        if(emprestimoAtivo){
            throw new Error("Este exemplar já está emprestado!");
        }

        const novoEmprestimo = new EmprestimoEntity(
            this.emprestimoRespository.gerarNovoId(),
            data.usuario,
            data.codExemplar,
            data.categoria
        );

        this.estoqueRepository.atualizarDisponibilidade(data.codExemplar, false);
        this.emprestimoRespository.insereEmprestimo(novoEmprestimo);

        return novoEmprestimo;
    }

    listarEmprestimos(){
        return this.emprestimoRespository.listarEmprestimos();
    }

    filtrarEmprestimoPorID(data: any){
        const id = data.id;
        const emprestimo = this.emprestimoRespository.filtraEmprestimoPorID;

        
    }
    
}