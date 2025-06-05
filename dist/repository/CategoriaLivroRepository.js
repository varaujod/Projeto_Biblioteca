"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroRepository = void 0;
const CategoriaLivro_1 = require("../model/CategoriaLivro");
class CategoriaLivroRepository {
    static instance;
    CategoriaLivroList = [];
    constructor() {
        this.CategoriaLivroList.push(new CategoriaLivro_1.CategoriaLivro("Romance"));
        this.CategoriaLivroList.push(new CategoriaLivro_1.CategoriaLivro("Computação"));
        this.CategoriaLivroList.push(new CategoriaLivro_1.CategoriaLivro("Letras"));
        this.CategoriaLivroList.push(new CategoriaLivro_1.CategoriaLivro("Gestão"));
    }
    ;
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaLivroRepository();
        }
        return this.instance;
    }
    listarCategoriasLivro() {
        return this.CategoriaLivroList;
    }
    encontrarCategoriaLivro(liv) {
        return this.CategoriaLivroList.find(livro => livro.nome === liv);
    }
}
exports.CategoriaLivroRepository = CategoriaLivroRepository;
