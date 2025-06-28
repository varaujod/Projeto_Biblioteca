import { EstoqueEntity } from "../model/EstoqueEntity";
import { executarComandoSQL } from "../database/mysql";
import { LivroEntity } from "../model/LivroEntity";

export class EstoqueRepository{
    private static instance: EstoqueRepository;
    private EstoqueList: EstoqueEntity[] = [];
    
    private constructor() {
        this.createTable();
    }
    
    public static getInstance(): EstoqueRepository{
        if(!this.instance){
            this.instance = new EstoqueRepository();
        }

        return this.instance;
    }

    private async createTable(){
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.Estoque(
                id INT AUTO_INCREMENT PRIMARY KEY,
                isbn DECIMAL(13) NOT NULL,
                quantidade DECIMAL(10) NOT NULL,
                quantidade_emprestada DECIMAL(10) NOT NULL,
                disponibilidade VARCHAR(15) NOT NULL
                )` 

        try{
            const resultado = await executarComandoSQL(query, []);
            console.log('Tabela de estoque criada com sucesso!', resultado);
        } catch(err){
            console.error('Erro ao executar a query de estoque: ', err);
        }
    }

    async insereLivroNoEstoque(livro: EstoqueEntity): Promise<EstoqueEntity>{
        const resultado = await executarComandoSQL(
            "INSERT INTO biblioteca.Estoque (isbn, quantidade, quantidade_emprestada, disponibilidade) values (?, ?, ?, ?)",
            [
                livro.isbn,
                livro.quantidade,
                livro.quantidade_emprestada,
                'disponivel'
            ]);

        console.log('Livro adicionado com sucesso no estoque!', resultado);
        return new EstoqueEntity(
            resultado.insertId,
            livro.isbn,
            livro.quantidade,
            livro.quantidade_emprestada, 
            livro.disponibilidade
        )
    }

    async filtraLivroNoEstoque(id: number): Promise<EstoqueEntity | null>{
        const resultado = await executarComandoSQL("SELECT * FROM biblioteca.Estoque where id = ?", [id]);
        if(resultado && resultado.length > 0){
            const user = resultado[0];
            return new EstoqueEntity(
                user.id,
                user.isbn,
                user.quantidade,
                user.quantidade_emprestada,
                user.disponibilidade
            );
        }
        return null;
    }

    async listarEstoque(): Promise<EstoqueEntity[]>{
        const resultado = await executarComandoSQL("SELECT * FROM biblioteca.Estoque", []);
        const estoque: EstoqueEntity[] = [];

        if(resultado && resultado.length > 0){
            for(let i = 0; i < resultado.length; i++){
                const user = resultado[i];
                estoque.push(new EstoqueEntity(
                    user.id,
                    user.isbn,
                    user.quantidade,
                    user.quantidade_emprestada,
                    user.disponibilidade
                ));
            }
        }
        return estoque;
    }

    async atualizarDisponibilidade(id: number, novaDisponibilidade: any): Promise<EstoqueEntity | null>{
        
        if(!novaDisponibilidade || !novaDisponibilidade.disponibilidade) {
            throw new Error("É necessário informar a nova disponibilidade");
        }

        if(novaDisponibilidade.disponibilidade !== 'disponivel' && novaDisponibilidade.disponibilidade !== 'não-disponivel') {
            throw new Error("Disponibilidade inválida. Use 'disponivel' ou 'não-disponivel'");
        }

        const resultado = await executarComandoSQL(
            `UPDATE biblioteca.Estoque SET disponibilidade = ? WHERE id = ?`, 
            [novaDisponibilidade.disponibilidade, id]);
        console.log(resultado);

        const disponibilidadeAtualizado = await this.filtraLivroNoEstoque(id);
        return disponibilidadeAtualizado;
    }

    async removerLivroNoEstoque(id: number): Promise<EstoqueEntity | null>{
        const livro = await this.filtraLivroNoEstoque(id);

        if(livro?.disponibilidade == 'disponivel'){
            await executarComandoSQL("DELETE FROM biblioteca.Estoque WHERE id = ?", [id]);
            return livro;
        } else{
            throw new Error("Este livro não pode ser excluido, assim que estiver disponivel, você poderá excluir!")
        }
    }

    async quantidadeLivrosEmprestados(id:number): Promise<boolean>{
        const livro = await this.filtraLivroNoEstoque(id);
        return livro?.id === Number(id) && livro?.quantidade_emprestada > 0
    }
}