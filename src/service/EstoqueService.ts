import { EstoqueEntity } from "../model/EstoqueEntity";
import { EstoqueRepository } from "../repository/EstoqueRepository";

export class EstoqueService{
    private estoqueRepository = EstoqueRepository.getInstance();

    novoLivronoEstoque(data: any): EstoqueEntity{
        if(!data.isbn || !data.cod){
            throw new Error("Por favor informar todos os campos");
        }

        const livroNoEstoque = new EstoqueEntity(data.isbn, data.cod);
        
        this.estoqueRepository.insereLivroNoEstoque(livroNoEstoque);
        
        return livroNoEstoque;
    }

    listarEstoque(){
        return this.estoqueRepository.listarEstoque();
    }

    filtrarLivroNoEstoque(data: any){
        const cod = data.cod;
        return this.estoqueRepository.filtraLivroNoEstoque(cod);
    }

    atualizarDisponibilidade(data: any){
        const cod = data.cod;
        const novaDisponibilidade = data.novaDisponibilidade;

        return this.estoqueRepository.atualizarDisponibilidade(cod, novaDisponibilidade);
    }

    removerLivroNoEstoque(cod: number){
        return this.estoqueRepository.removerLivroNoEstoque(cod);
    }

}