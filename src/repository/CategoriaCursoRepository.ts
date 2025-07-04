import { executarComandoSQL } from "../database/mysql";
import { CategoriaCurso } from "../model/entity/CategoriaCurso";

export class CategoriaCursoRepository{
    private static instance: CategoriaCursoRepository;
    
    private constructor() {
        this.criarTable();
        this.inserirCategoriasPadrao();
    };
    
    public static getInstance(): CategoriaCursoRepository{
        if(!this.instance){
            this.instance = new CategoriaCursoRepository();
        }
    
        return this.instance;
    }

    private async criarTable(){
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.CategoriaCurso(
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(100) NOT NULL
            )`

        try{
            const resultado = await executarComandoSQL(query, []);
            console.log('Tabela de categoria de cursos criada com sucesso', resultado);
        } catch(err){
            console.error('Erro ao executar a query de estoque: ', err);
        }
    }

    private async inserirCategoriasPadrao(){
        const categorias = ["ADS", "Pedagogia", "Administração"];
        await executarComandoSQL("DROP TABLE IF EXISTS biblioteca.CategoriaCurso", []);
        await executarComandoSQL("CREATE TABLE IF NOT EXISTS biblioteca.CategoriaCurso(id INT AUTO_INCREMENT PRIMARY KEY, nome VARCHAR(100) NOT NULL)", []);
        for(const nome of categorias){
            try{
                const resultado = await executarComandoSQL("INSERT IGNORE INTO biblioteca.CategoriaCurso (nome) values (?)", [nome]);
                console.log('Categoria criada com sucesso!', resultado);
            } catch(err){
                console.error(`Erro ao inserir categoria ${nome}:`, err);
            }
        }
    }

    async listarCursos(): Promise<CategoriaCurso[]>{
        const resultado = await executarComandoSQL("SELECT * FROM biblioteca.CategoriaCurso", []);
        const categorias: CategoriaCurso[] = [];

        if(resultado && resultado.length > 0){
            for (let i = 0; i < resultado.length; i++) {
                const row = resultado[i];
                categorias.push(new CategoriaCurso(row.id, row.nome));
            } 
        }

        return categorias;
    }

    async encontrarCursos(cat: string): Promise<CategoriaCurso | null> {
            const query = `SELECT * FROM biblioteca.CategoriaCurso WHERE nome = ?`;
            const resultado = await executarComandoSQL(query, [cat]);
    
            if (resultado && resultado.length > 0) {
                const row = resultado[0];
                return new CategoriaCurso(row.id, row.nome);
            }
    
            return null;
        }
}