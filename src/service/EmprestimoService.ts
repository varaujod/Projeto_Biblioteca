import { EmprestimoEntity } from "../model/EmprestimoEntity";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { LivroRepository } from "../repository/LivroRepository";
import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";

export class EmprestimoService{
    private emprestimoRespository = EmprestimoRepository.getInstance();
    private usuarioRepository = UsuarioRepository.getInstance();
    private estoqueRepository = EstoqueRepository.getInstance();
    private livroRepository = LivroRepository.getInstance();
    private categoriaUsuarioRepository = CategoriaUsuarioRepository.getInstance();

    async novoEmprestimo(data: any): Promise<EmprestimoEntity>{
        const usuario = await this.usuarioRepository.filtraUsuarioPorCPF(data.usuario);

        if(!usuario){
            throw new Error("Usuário não encontrado!");
        }
        
        usuario.atualizarStatusPorAtraso(usuario.diasAtraso || 0);
        usuario.atualizarLivrosAtrasados(usuario.livrosAtrasados || 0);

        if(usuario.status != 'ativo'){
            throw new Error("Usuário não está ativo para realizar empréstimos!");
        }

        if(await this.emprestimoRespository.verificarUsuarioSuspenso(data.usuario)){
            await this.usuarioRepository.atualizarUsuarioPorCPF(data.usuario, { status: 'suspenso'});
            throw new Error("Usuário possui empréstimos em atraso!");
        }

        const estoque = await this.estoqueRepository.filtraLivroNoEstoque(data.codExemplar);

        if(!estoque){
            throw new Error("Exemplar não encontrado!");
        }

        if(estoque.disponibilidade === 'não-disponivel'){
            throw new Error("Este exemplar não está disponível para empréstimo!");
        }

        if(!this.emprestimoRespository.verificarLimiteEmprestimo(data.usuario, data.categoria)){
            let limite = 0;

            if(data.categoria === 'professor'){
                limite = 5;
            } else{
                limite = 3;
            }

            throw new Error(`Usuário já atingiu o limite máximo de ${limite} empréstimos simultâneos!`);
        }

        if(!this.categoriaUsuarioRepository.encontrarCategoria(data.categoria)) {
            throw new Error("Por favor informar uma categoria existente");
        }

        if(!estoque) {
            throw new Error("Exemplar não encontrado!");
        }

        const exemplarEstoque = await this.estoqueRepository.filtraLivroNoEstoque(data.codExemplar);

        if(estoque.quantidade_emprestada < estoque.quantidade) {
            estoque.quantidade_emprestada += 1;
            if (estoque.quantidade_emprestada === estoque.quantidade) {
                estoque.disponibilidade = 'não-disponivel';
                if(exemplarEstoque){
                    await this.livroRepository.atualizarLivroPorISBN(exemplarEstoque.isbn, { status: 'não-disponivel'});
                }
            }

            await this.estoqueRepository.atualizarDisponibilidade(estoque.id, { 
            disponibilidade: estoque.disponibilidade,
            quantidade_emprestada: estoque.quantidade_emprestada
            });
        } else {
            throw new Error("Todos os exemplares estão emprestados!");
        }

        return await this.emprestimoRespository.insereEmprestimo(data);
    }

    async listarEmprestimos(): Promise<EmprestimoEntity[]>{
        return await this.emprestimoRespository.listarEmprestimos();
    }

    async listarEmprestimosAtivos(): Promise<EmprestimoEntity[]>{
        return await this.emprestimoRespository.listarEmprestimosAtivos();
    }
    
    filtrarEmprestimoPorID(data: any): Promise<EmprestimoEntity | null>{
        const id = data.id;
        const emprestimo = this.emprestimoRespository.filtraEmprestimoPorID(id);

        if(emprestimo === null){
            throw new Error("Emprestimo não encontrado");
        }

        return emprestimo;
    }

    async registrarDevolucao(data: any): Promise<EmprestimoEntity | null>{
        const id = data.id;
        const novoStatus = 'devolvido';

        const emprestimo = await this.emprestimoRespository.filtraEmprestimoPorID(id);
        if (!emprestimo) {
            throw new Error("Empréstimo não encontrado!");
        }

        const usuario = await this.usuarioRepository.filtraUsuarioPorCPF(emprestimo.usuario);
        if (!usuario) {
            throw new Error("Usuário não encontrado!");
        }

        await this.emprestimoRespository.atualizarStatusEmprestimo(id, novoStatus);
        usuario.atualizarLivrosAtrasados(Math.max(0, usuario.livrosAtrasados - 1));

        if(usuario.livrosAtrasados <= 2 && usuario.diasSuspensao <= 60) {
            usuario.status = "ativo";
        }

        await this.usuarioRepository.atualizarUsuarioPorCPF(usuario.cpf, usuario.status);

        const estoque = await this.estoqueRepository.filtraLivroNoEstoque(Number(emprestimo.codExemplar));

        if(estoque && estoque.quantidade_emprestada > 0) {
            estoque.quantidade_emprestada -= 1;
            if (estoque.quantidade_emprestada < estoque.quantidade) {
                estoque.disponibilidade = 'disponivel';
                await this.livroRepository.atualizarLivroPorISBN(estoque.isbn, { status: 'disponivel'});
            }
            await this.estoqueRepository.atualizarDisponibilidade(estoque.id, { 
                disponibilidade: estoque.disponibilidade,
                quantidade_emprestada: estoque.quantidade_emprestada
            });
        }

        return await this.emprestimoRespository.filtraEmprestimoPorID(id);
    }
    
}