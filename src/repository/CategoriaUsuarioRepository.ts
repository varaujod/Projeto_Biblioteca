import { CategoriaUsuario } from "../model/CategoriaUsuario";

export class CategoriaUsuarioRepository{
    private static instance: CategoriaUsuarioRepository;
    private CategoriaUsuarioList: CategoriaUsuario[] = [];

    private constructor() {
        this.CategoriaUsuarioList.push(new CategoriaUsuario("Aluno"));
        this.CategoriaUsuarioList.push(new CategoriaUsuario("Professor"));
        this.CategoriaUsuarioList.push(new CategoriaUsuario("Bibliotecario"));
    };

    public static getInstance(): CategoriaUsuarioRepository{
        if(!this.instance){
            this.instance = new CategoriaUsuarioRepository();
        }

        return this.instance;
    }

    listarCategoria(){
        return this.CategoriaUsuarioList;
    }

    encontrarCategoria(cat: string){
        return this.CategoriaUsuarioList.find(categoria => categoria.nome === cat)
    }
}