import { EstoqueEntity } from "../model/EstoqueEntity";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { LivroRepository } from "../repository/LivroRepository";

export class EstoqueService{
    private estoqueRepository = EstoqueRepository.getInstance();
    private livroRepository = LivroRepository.getInstance();

    novoLivronoEstoque(data: any): EstoqueEntity{
        if(!data.isbn || !data.cod){
            throw new Error("Por favor informar todos os campos");
        }

        const livroExistente = this.livroRepository.filtraLivroPorISBN(data.isbn);

        if(!livroExistente) {
            throw new Error("Não é possível adicionar um exemplar de um livro que não está cadastrado. Por favor, cadastre o livro primeiro.");
        }

        const exemplarExistente = this.estoqueRepository.filtraLivroNoEstoque(data.cod);

        if(exemplarExistente) {
            throw new Error("Já existe um exemplar com este código!");
        }

        const livroNoEstoque = new EstoqueEntity(data.isbn, data.cod, data.quantidade, 0);
        
        this.estoqueRepository.insereLivroNoEstoque(livroNoEstoque);
        
        return livroNoEstoque;
    }

    listarEstoque(){
        return this.estoqueRepository.listarEstoque();
    }

    filtrarLivroNoEstoque(data: any){
        const cod = data.cod;
        const exemplar = this.estoqueRepository.filtraLivroNoEstoque(cod);
        
        if(!exemplar) {
            throw new Error("Exemplar não encontrado");
        }

        const livro = this.livroRepository.filtraLivroPorISBN(exemplar.isbn);
        
        return {
            exemplar: exemplar,
            livro: livro
        };
    }

    atualizarDisponibilidade(data: any){
        const cod = data.cod;
        const novaDisponibilidade = data.novaDisponibilidade;
        const estoque = this.estoqueRepository.filtraLivroNoEstoque(cod);

        if(estoque && estoque.quantidade_emprestada === estoque.quantidade){
            this.estoqueRepository.atualizarDisponibilidade(cod, { disponibilidade: 'não-disponivel'});
        }

        return this.estoqueRepository.atualizarDisponibilidade(cod, novaDisponibilidade);
    }

    removerLivroNoEstoque(cod: number){
        const estoque = this.estoqueRepository.filtraLivroNoEstoque(cod);
        if (!estoque) {
            throw new Error("Exemplar não encontrado!");
        }
    
        if(estoque.quantidade_emprestada === 0){
            return this.estoqueRepository.removerLivroNoEstoque(cod);
        } else {
            throw new Error("Há exemplares emprestados desse Livro, assim que não tiver mais exemplares emprestados você poderá remover este livro no estoque");
        }
    }

}