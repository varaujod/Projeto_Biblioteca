export class EstoqueEntity{
    id: number;
    isbn: number;
    quantidade: number;
    quantidade_emprestada: number;
    // disponibilidade: string;
    disponibilidade: 'disponivel' | 'não-disponivel';

    constructor(id: number, isbn: number, quantidade: number, quantidade_emprestada: number){
        if(!isbn || !quantidade){
            throw new Error("Por favor informar todos os campos");
        }
        this.id = id;
        this.isbn = isbn;
        this.quantidade = quantidade;
        this.quantidade_emprestada = quantidade_emprestada;
        this.disponibilidade = 'disponivel';
    }
}