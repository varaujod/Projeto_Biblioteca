"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueService = void 0;
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const LivroRepository_1 = require("../repository/LivroRepository");
class EstoqueService {
    estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
    livroRepository = LivroRepository_1.LivroRepository.getInstance();
    async novoLivronoEstoque(data) {
        const livroExistente = await this.livroRepository.filtraLivroPorISBN(data.isbn);
        if (!livroExistente) {
            throw new Error("Não é possível adicionar um exemplar de um livro que não está cadastrado. Por favor, cadastre o livro primeiro.");
        }
        if (data.quantidade <= 0) {
            throw new Error("Não é possível cadastrar este livro no estoque, pois a quantidade informada é zero");
        }
        return await this.estoqueRepository.insereLivroNoEstoque(data);
    }
    async listarEstoque() {
        return await this.estoqueRepository.listarEstoque();
    }
    async filtrarLivroNoEstoque(data) {
        const id = Number(data.id);
        const exemplar = await this.estoqueRepository.filtraLivroNoEstoque(id);
        if (exemplar === null) {
            throw new Error("Exemplar não encontrado");
        }
        return exemplar;
    }
    async atualizarDisponibilidade(data) {
        const id = Number(data.id);
        const novaDisponibilidade = data.novaDisponibilidade;
        const estoque = await this.estoqueRepository.filtraLivroNoEstoque(id);
        if (estoque && estoque.quantidade_emprestada === estoque.quantidade) {
            await this.estoqueRepository.atualizarDisponibilidade(id, { disponibilidade: 'não-disponivel' });
            await this.livroRepository.atualizarLivroPorISBN(estoque.isbn, { status: 'não-disponivel' });
        }
        if (!novaDisponibilidade) {
            throw new Error("Disponibilidade não informada");
        }
        return await this.estoqueRepository.atualizarDisponibilidade(id, { disponibilidade: novaDisponibilidade });
    }
    async removerLivroNoEstoque(id) {
        const estoque = await this.estoqueRepository.filtraLivroNoEstoque(id);
        if (estoque === null) {
            throw new Error("Exemplar não encontrado!");
        }
        console.log('quantidade_emprestada:', estoque.quantidade_emprestada, typeof estoque.quantidade_emprestada);
        if (Number(estoque.quantidade_emprestada) === 0) {
            const removido = await this.estoqueRepository.removerLivroNoEstoque(id);
            if (!removido) {
                throw new Error("Erro ao remover o exemplar do estoque!");
            }
            return removido;
        }
        else {
            throw new Error("Há exemplares emprestados desse Livro, assim que não tiver mais exemplares emprestados você poderá remover este livro no estoque");
        }
    }
}
exports.EstoqueService = EstoqueService;
