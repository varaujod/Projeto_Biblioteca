import { CategoriaUsuario } from "../model/CategoriaUsuario";

export class CategoriaUsuarioRepository{
    private static instance: CategoriaUsuarioRepository;
    private CategoriaUsuarioList: CategoriaUsuario[] = [];

    private constructor() {};

    public static getInstance(): CategoriaUsuarioRepository{
        if(!this.instance){
            this.instance = new CategoriaUsuarioRepository();
        }

        return this.instance;
    }

    insereCategoria(categoria: CategoriaUsuario){
        this.CategoriaUsuarioList.push(categoria);
    }

    listarCategoria(){
        return this.CategoriaUsuarioList;
    }

    encontrarCategoria(cat: string){
        return this.CategoriaUsuarioList.find(categoria => categoria.nome === cat)
    }
}