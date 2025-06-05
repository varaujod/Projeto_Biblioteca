"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaCursoRepository = void 0;
const CategoriaCurso_1 = require("../model/CategoriaCurso");
class CategoriaCursoRepository {
    static instance;
    CategoriaCursoList = [];
    constructor() {
        this.CategoriaCursoList.push(new CategoriaCurso_1.CategoriaCurso("ADS"));
        this.CategoriaCursoList.push(new CategoriaCurso_1.CategoriaCurso("Pedagogia"));
        this.CategoriaCursoList.push(new CategoriaCurso_1.CategoriaCurso("Administração"));
    }
    ;
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaCursoRepository();
        }
        return this.instance;
    }
    listarCursos() {
        return this.CategoriaCursoList;
    }
    encontrarCurso(cur) {
        return this.CategoriaCursoList.find(curso => curso.nome === cur);
    }
}
exports.CategoriaCursoRepository = CategoriaCursoRepository;
