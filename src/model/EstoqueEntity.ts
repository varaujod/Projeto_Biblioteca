export class EstoqueEntity{
    static ultimoId: number = 0;

    isbn: number;
    cod: number;
    quantidade: number;
    quantidade_emprestada: number;
    disponibilidade: 'disponivel' | 'não-disponivel';

    constructor(isbn: number, quantidade: number, quantidade_emprestada: number){
        if(!isbn || !quantidade){
            throw new Error("Por favor informar todos os campos");
        }
        this.isbn = isbn;
        this.cod = this.gerarId();
        this.quantidade = quantidade
        this.quantidade_emprestada = quantidade_emprestada
        this.disponibilidade = 'disponivel';
    }

    gerarId(): number{
        EstoqueEntity.ultimoId++;
        return EstoqueEntity.ultimoId;
    }
}