"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueService = void 0;
const EstoqueEntity_1 = require("../model/EstoqueEntity");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const LivroRepository_1 = require("../repository/LivroRepository");
class EstoqueService {
    estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
    livroRepository = LivroRepository_1.LivroRepository.getInstance();
    novoLivronoEstoque(data) {
        const livroExistente = this.livroRepository.filtraLivroPorISBN(data.isbn);
        if (!livroExistente) {
            throw new Error("Não é possível adicionar um exemplar de um livro que não está cadastrado. Por favor, cadastre o livro primeiro.");
        }
        const exemplarExistente = this.estoqueRepository.filtraLivroNoEstoque(data.cod);
        if (exemplarExistente) {
            throw new Error("Já existe um exemplar com este código!");
        }
        if (data.quantidade <= 0) {
            throw new Error("Não é possível cadastrar este livro no estoque, pois a quantidade informada é zero");
        }
        const livroNoEstoque = new EstoqueEntity_1.EstoqueEntity(data.isbn, data.quantidade, 0);
        this.estoqueRepository.insereLivroNoEstoque(livroNoEstoque);
        return livroNoEstoque;
    }
    listarEstoque() {
        return this.estoqueRepository.listarEstoque();
    }
    filtrarLivroNoEstoque(data) {
        const cod = data.cod;
        const exemplar = this.estoqueRepository.filtraLivroNoEstoque(cod);
        if (!exemplar) {
            throw new Error("Exemplar não encontrado");
        }
        const livro = this.livroRepository.filtraLivroPorISBN(exemplar.isbn);
        return {
            exemplar: exemplar,
            livro: livro
        };
    }
    atualizarDisponibilidade(data) {
        const cod = data.cod;
        const novaDisponibilidade = data.novaDisponibilidade;
        const estoque = this.estoqueRepository.filtraLivroNoEstoque(cod);
        if (estoque && estoque.quantidade_emprestada === estoque.quantidade) {
            this.estoqueRepository.atualizarDisponibilidade(cod, { disponibilidade: 'não-disponivel' });
            this.livroRepository.atualizarLivroPorISBN(estoque.isbn, { status: 'emprestado' });
        }
        return this.estoqueRepository.atualizarDisponibilidade(cod, novaDisponibilidade);
    }
    removerLivroNoEstoque(cod) {
        const estoque = this.estoqueRepository.filtraLivroNoEstoque(cod);
        if (!estoque) {
            throw new Error("Exemplar não encontrado!");
        }
        if (estoque.quantidade_emprestada === 0) {
            return this.estoqueRepository.removerLivroNoEstoque(cod);
        }
        else {
            throw new Error("Há exemplares emprestados desse Livro, assim que não tiver mais exemplares emprestados você poderá remover este livro no estoque");
        }
    }
}
exports.EstoqueService = EstoqueService;
