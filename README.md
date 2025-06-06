## Projeto I - Gestão de Biblioteca Acadêmica

Este projeto é uma atividade de avaliação da disciplina de Programação Web, parte do Curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas do Instituto Federal de São Paulo (IFSP), Câmpus Boituva. A disciplina é ministrada pelo **Prof. Dr. Anisio Silva**. 

## Objetivo do Projeto

O principal objetivo é desenvolver uma API (Interface de Programação de Aplicações) para a gestão completa de uma biblioteca acadêmica. Esta API visa permitir o gerenciamento eficiente do acervo bibliográfico, dos usuários da biblioteca e de todas as transações de empréstimos, seguindo rigorosamente um conjunto de regras de negócio pré-definidas.

## Arquitetura e Tecnologia

A API está sendo construída com base na arquitetura **MVC (Model-View-Controller)**, utilizando **TypeScript** em conjunto com o framework **Express.js**. Para a persistência dos dados, serão utilizados **arrays em memória**, sem a necessidade de um banco de dados externo. É importante notar que o projeto proíbe o uso de herança entre classes. 

## Funcionalidades Principais

O sistema permitirá:

* **Gestão de Usuários:** Cadastro, listagem, visualização detalhada, atualização e remoção de membros da biblioteca (professores, alunos, bibliotecários). 
* **Gestão de Livros:** Adição de novos livros ao acervo, listagem, visualização detalhada, atualização de informações e remoção. 
* **Gestão de Estoque:** Controle de exemplares físicos dos livros, com registro de disponibilidade, cadastro, listagem, detalhes, atualização e remoção de exemplares. 
* **Gestão de Empréstimos:** Registro de novas transações de empréstimo e devolução de livros, com validação de regras de negócio específicas.
* **Catálogos:** Listagem de categorias de usuários, categorias de livros e cursos disponíveis. 

Todas as operações serão expostas através de endpoints RESTful acessíveis via `http://localhost:3090/library`.

## Testes Realizados por mim durante o Desenvolvimento do Projeto - Via Postman (API Network)

* **Usuário**: https://vinicius-9524872.postman.co/workspace/vinicius's-Workspace~3cfd6de5-ef05-4897-8a48-af17ccc0e9dd/collection/44799119-b0839ccd-ae23-4b47-9ad3-c358fe476763?action=share&creator=44799119

* **Livro**: https://vinicius-9524872.postman.co/workspace/vinicius's-Workspace~3cfd6de5-ef05-4897-8a48-af17ccc0e9dd/collection/44799119-4e054198-7609-43de-acc4-37215b8a65f5?action=share&creator=44799119

* **Estoque**: https://vinicius-9524872.postman.co/workspace/vinicius's-Workspace~3cfd6de5-ef05-4897-8a48-af17ccc0e9dd/collection/44799119-fe73ac99-29af-429c-8449-fe661532f4e4?action=share&creator=44799119

* **Emprestimo**: https://vinicius-9524872.postman.co/workspace/vinicius's-Workspace~3cfd6de5-ef05-4897-8a48-af17ccc0e9dd/collection/44799119-6a837588-51a0-4244-a72a-a5ab11f865cf?action=share&creator=44799119

* **Catalogo**: https://vinicius-9524872.postman.co/workspace/vinicius's-Workspace~3cfd6de5-ef05-4897-8a48-af17ccc0e9dd/collection/44799119-3a726146-cf4b-45ad-92c8-fd155d3de0b5?action=share&creator=44799119
