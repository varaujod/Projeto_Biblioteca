import { EmprestimoEntity } from "../model/EmprestimoEntity";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { LivroRepository } from "../repository/LivroRepository";

export class EmprestimoService{
    private emprestimoRespository = EmprestimoRepository.getInstance();
    private usuarioRepository = UsuarioRepository.getInstance();
    private estoqueRepository = EstoqueRepository.getInstance();
    private livroRepository = LivroRepository.getInstance();

    novoEmprestimo(data: any): EmprestimoEntity{
        if(!data.usuario || !data.codExemplar || !data.categoria){
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
            this.usuarioRepository.atualizarUsuarioPorCPF(data.usuario, { status: 'suspenso'});
            throw new Error("Usuário possui empréstimos em atraso!");
        }

        const exemplar = this.estoqueRepository.filtraLivroNoEstoque(data.codExemplar);

        if(!exemplar){
            throw new Error("Exemplar não encontrado!");
        }

        if(exemplar.disponibilidade === 'não-disponivel'){
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
                limite = 5;
            } else{
                limite = 3;
            }

            throw new Error(`Usuário já atingiu o limite máximo de ${limite} empréstimos simultâneos!`);
        }

        const exemplarEmprestado = this.emprestimoRespository.filtraEmprestimoAtivoDoExemplar(data.codExemplar);

        if(exemplarEmprestado){
            throw new Error("Este exemplar já está emprestado!");
        }

        const novoEmprestimo = new EmprestimoEntity(
            data.usuario,
            data.codExemplar,
            data.categoria
        );

        this.estoqueRepository.atualizarDisponibilidade(data.codExemplar, { disponibilidade: 'não-disponivel' });
        const exemplarEstoque = this.estoqueRepository.filtraLivroNoEstoque(data.codExemplar);

        if(exemplarEstoque && exemplarEstoque.isbn) {
            this.livroRepository.atualizarLivroPorISBN(exemplarEstoque.isbn, { status: 'emprestado'});
        }

        this.emprestimoRespository.insereEmprestimo(novoEmprestimo);

        return novoEmprestimo;
    }

    listarEmprestimos(){
        return this.emprestimoRespository.listarEmprestimos();
    }

    listarEmprestimosAtivos(){
        return this.emprestimoRespository.listarEmprestimosAtivos();
    }
    
    filtrarEmprestimoPorID(data: any){
        const id = data.id;
        const emprestimo = this.emprestimoRespository.filtraEmprestimoPorID(id);

        if(!emprestimo){
            throw new Error("Emprestimo não encontrado");
        }

        return emprestimo;
    }

    registrarDevolucao(data: any){
        const id = data.id;
        const novoStatus = data.novoStatus;

        if(novoStatus == 'devolvido'){
            const emprestimo = this.emprestimoRespository.filtraEmprestimoPorID(id);
            if (emprestimo) {
                this.estoqueRepository.atualizarDisponibilidade(emprestimo.codExemplar, { disponibilidade: 'disponivel' });
                const exemplarEstoque = this.estoqueRepository.filtraLivroNoEstoque(emprestimo.codExemplar);
                if (exemplarEstoque && exemplarEstoque.isbn) {
                    this.livroRepository.atualizarLivroPorISBN(exemplarEstoque.isbn, { status: 'disponivel'});
                }
                return this.emprestimoRespository.atualizarStatusEmprestimo(id, novoStatus);
            }
        }
        
        throw new Error("Não foi possivel registrar a sua devolução!");
    }
    
}