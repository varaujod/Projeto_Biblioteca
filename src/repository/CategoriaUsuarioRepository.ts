import { executarComandoSQL } from "../database/mysql";
import { CategoriaUsuario } from "../model/entity/CategoriaUsuario";

export class CategoriaUsuarioRepository{
    private static instance: CategoriaUsuarioRepository;

    private constructor() {
        this.criarTable();
        this.inserirCategoriasPadrao();
    };

    public static getInstance(): CategoriaUsuarioRepository{
        if(!this.instance){
            this.instance = new CategoriaUsuarioRepository();
        }

        return this.instance;
    }

    private async criarTable(){
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.CategoriaUsuario(
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(100) NOT NULL
                )`
    
        try{
            const resultado = await executarComandoSQL(query, []);
            console.log('Tabela de categoria de usuarios criada com sucesso!', resultado);
        } catch(err){
            console.error('Erro ao executar a query de estoque: ', err);
        }
    }

    private async inserirCategoriasPadrao(){
        const categorias = ["Aluno", "Professor", "Bibliotecário"];
        await executarComandoSQL("DROP TABLE IF EXISTS biblioteca.CategoriaUsuario", []);
        await executarComandoSQL("CREATE TABLE IF NOT EXISTS biblioteca.CategoriaUsuario(id INT AUTO_INCREMENT PRIMARY KEY, nome VARCHAR(100) NOT NULL)", []);
        for(const nome of categorias){
            try{
                const resultado = await executarComandoSQL("INSERT INTO biblioteca.CategoriaUsuario (nome) VALUES (?)", [nome]);
                console.log('Categoria criada com sucesso!', resultado);
            } catch(err){
                console.error(`Erro ao inserir categoria ${nome}:`, err);
            }
        }
    }

    async listarCategoria(): Promise<CategoriaUsuario[]>{
        const resultado = await executarComandoSQL("SELECT * FROM biblioteca.CategoriaUsuario", []);
        const categorias: CategoriaUsuario[] = [];

        if(resultado && resultado.length > 0){
            for (let i = 0; i < resultado.length; i++) {
                const row = resultado[i];
                categorias.push(new CategoriaUsuario(row.id, row.nome));
            } 
        }

        return categorias;
    }

    async encontrarCategoria(cat: string): Promise<CategoriaUsuario | null> {
        const query = `SELECT * FROM biblioteca.CategoriaUsuario WHERE nome = ?`;
        const resultado = await executarComandoSQL(query, [cat]);

        if (resultado && resultado.length > 0) {
            const row = resultado[0];
            return new CategoriaUsuario(row.id, row.nome);
        }

        return null;
    }
}