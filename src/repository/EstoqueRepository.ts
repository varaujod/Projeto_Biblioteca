import { EstoqueEntity } from "../model/EstoqueEntity";

export class EstoqueRepository{
    private static instance: EstoqueRepository;
    private EstoqueList: EstoqueEntity[] = [];
    
    private constructor() {}
    
    public static getInstance(): EstoqueRepository{
        if(!this.instance){
            this.instance = new EstoqueRepository();
        }

        return this.instance;
    }

    insereLivroNoEstoque(livro: EstoqueEntity){
        this.EstoqueList.push(livro);
    }

    filtraLivroNoEstoque(cod: number){
        return this.EstoqueList.find(estoque => estoque.cod === cod);
    }

    listarEstoque(){
        return this.EstoqueList;
    }

    atualizarDisponibilidade(cod: number, novaDisponibilidade: any){
        const index = this.findIndex(cod);
        const estoque = this.EstoqueList[index];

        if(novaDisponibilidade.disponibilidade){
            if(novaDisponibilidade.disponibilidade === 'não-disponivel'){
               
                estoque.disponibilidade = novaDisponibilidade.disponibilidade;
            } else if(novaDisponibilidade.disponibilidade === 'disponivel'){
                estoque.disponibilidade = novaDisponibilidade.disponibilidade;
            }

            this.EstoqueList[index] = estoque;
            return estoque;
        } else{
            throw new Error("Este exemplar não está disponivel (não-disponivel)");
        }
    }

    removerLivroNoEstoque(cod: number){
        const index = this.findIndex(cod);
        const estoque = this.EstoqueList[index];

        if(estoque.disponibilidade == 'disponivel' ){
            return this.EstoqueList.splice(index, 1);
        } else{
            throw new Error("Este livro não pode ser excluido, assim que estiver disponivel, você poderá excluir!")
        }
    }

    private findIndex(cod: number): number{
        const index = this.EstoqueList.findIndex(estoque => estoque.cod == cod);

        if(index == -1){
            throw new Error("Codigo informado não foi encontrado no estoque!");
        }

        return index;
    }

}