import { executarComandoSQL } from "../database/mysql";
import { CategoriaUsuario } from "../model/CategoriaUsuario";

export class CategoriaUsuarioRepository{
    private static instance: CategoriaUsuarioRepository;
    private CategoriaUsuarioList: CategoriaUsuario[] = [];

    private constructor() {
        this.CategoriaUsuarioList.push(new CategoriaUsuario(1, "Aluno"));
        this.CategoriaUsuarioList.push(new CategoriaUsuario(2,"Professor"));
        this.CategoriaUsuarioList.push(new CategoriaUsuario(3,"Bibliotecario"));
        this.criarTable();
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
            console.log('Tabela de estoque criada com sucesso!', resultado);
        } catch(err){
            console.error('Erro ao executar a query de estoque: ', err);
        }
    }

    listarCategoria(){
        return this.CategoriaUsuarioList;
    }

    async encontrarCategoriaNoBanco(cat: string): Promise<CategoriaUsuario | null> {
        const query = "SELECT * FROM biblioteca.CategoriaUsuario WHERE nome = ?";
        const resultado = await executarComandoSQL(query, [cat]);
        if (resultado && resultado.length > 0) {
            const row = resultado[0];
            return new CategoriaUsuario(row.id, row.nome);
        }
        return null;
    }
}