import { executarComandoSQL } from "../database/mysql";
import { LivroEntity } from "../model/LivroEntity";

export class LivroRepository{
    private static instance: LivroRepository;

    private constructor() {
        this.criarTable();
    }

    public static getInstance(): LivroRepository{
        if(!this.instance){
            this.instance = new LivroRepository();
        }
        return this.instance;
    }

    private async criarTable(){
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.Livro(
                id INT AUTO_INCREMENT PRIMARY KEY,
                titulo VARCHAR(255) NOT NULL,
                isbn DECIMAL(13) NOT NULL UNIQUE,
                autor VARCHAR(255) NOT NULL,
                editora VARCHAR(255) NOT NULL,
                edicao VARCHAR(255) NOT NULL,
                categoria VARCHAR(255) NOT NULL,
                status VARCHAR(15) NOT NULL
                )`

        try{
            const resultado = await executarComandoSQL(query, []);
            console.log('Tabela de Livro criada com Sucesso!', resultado);
        } catch(err){
            console.error('Erro ao executar a query de livro: ', err);
        }
    }

    async insereLivro(livro: LivroEntity): Promise<LivroEntity>{
        const resultado = await executarComandoSQL(
            "INSERT INTO biblioteca.Livro (titulo, isbn, autor, editora, edicao, categoria, status) values (?,?,?,?,?,?,?)",
            [
                livro.titulo, 
                livro.isbn,
                livro.autor,
                livro.editora,
                livro.edicao,
                livro.categoria,
                'disponivel'
            ]);
        
            console.log("Livro criado com Sucesso: ", resultado);

        return new LivroEntity(
            livro.titulo,
            livro.isbn,
            livro.autor,
            livro.editora,
            livro.edicao,
            livro.categoria,
            'disponivel'
        );
    }
    
    validacaoISBN(isbn: number): boolean {
        return isbn.toString().length === 13;
    }

    async filtraLivroPorISBN(isbn: number): Promise<LivroEntity | null>{
        const resultado = await executarComandoSQL("SELECT * FROM biblioteca.Livro WHERE isbn = ?", [isbn]);
        if(resultado && resultado.length > 0) {
            const user = resultado[0];
            return new LivroEntity(
                user.titulo,
                user.isbn,
                user.autor,
                user.editora,
                user.edicao, 
                user.categoria,
                user.status
            );
        }
        return null;
    }

    async validacaoLivro(isbn: number): Promise<boolean> {
        const livro = await this.filtraLivroPorISBN(isbn);
        return livro !== null;
    }

    async removeLivroPorISBN(isbn: number): Promise<LivroEntity | null>{
       const livro = await this.filtraLivroPorISBN(isbn);
       if(!livro){
            return null;
       }

       await executarComandoSQL("DELETE FROM biblioteca.Livro where isbn = ?", [isbn]);
       return livro;
    }

    async atualizarLivroPorISBN(isbn: number, novosDados: any): Promise<LivroEntity | null>{
        const campos: string[] = [];
        const valores: any[] = [];

        if(novosDados.titulo){
            campos.push("titulo = ?");
            valores.push(novosDados.titulo);
        }

        if(novosDados.autor){
            campos.push("autor = ?");
            valores.push(novosDados.autor);
        }

        if(novosDados.editora){
            campos.push("editora = ?");
            valores.push(novosDados.editora);
        }

        if(novosDados.edicao){
            campos.push("edicao = ?");
            valores.push(novosDados.edicao);
        }

        if(novosDados.categoria){
            campos.push("categoria = ?");
            valores.push(novosDados.categoria);
        }

        if(novosDados.status){
            campos.push("status = ?");
            valores.push(novosDados.status);
        }

        if (campos.length === 0) {
            return await this.filtraLivroPorISBN(isbn);
        }

        const sql = `UPDATE biblioteca.Livro SET ${campos.join(", ")} WHERE isbn = ?`;
        valores.push(isbn);

        const resultado = await executarComandoSQL(sql, valores);
        console.log(resultado);

        return await this.filtraLivroPorISBN(isbn);
    }

    async listarLivros(): Promise<LivroEntity[]>{
        const resultado = await executarComandoSQL("SELECT * FROM biblioteca.Livro", []);
        const livros: LivroEntity[] = [];
        if(resultado && resultado.length > 0){
            for(let i = 0; i < resultado.length; i++){
                const user = resultado[i];
                livros.push(new LivroEntity(
                    user.titulo,
                    user.isbn,
                    user.autor,
                    user.editora,
                    user.edicao, 
                    user.categoria,
                    user.status
                ));
            }
        }
        return livros;
    }
}