## Projeto I - Gestão de Biblioteca.

Esta atividade está sendo desenvolvida como parte da avaliação da disciplina de Programação Web do
Curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas do Instituto Federal de São
Paulo, Campus Boituva ministrada pelo Professor e Doutor Anisio Silva.

O projeto tem com objetivo desenvolver uma API para gestão de biblioteca acadêmica com arquitetura MVC.

O sistema deve permitir o gerenciamento completo do acervo bibliográfico, usuários e empréstimos,
seguindo rigorosamente as regras de negócio estabelecidas.

## Projeto I - Gestão de Biblioteca Acadêmica

Este projeto é uma atividade de avaliação da disciplina de Programação Web, parte do Curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas do Instituto Federal de São Paulo (IFSP), Câmpus Boituva. A disciplina é ministrada pelo **Prof. Dr. Anisio Silva**. [cite: 1]

## Objetivo do Projeto

O principal objetivo é desenvolver uma API (Interface de Programação de Aplicações) para a gestão completa de uma biblioteca acadêmica. [cite: 1, 3] Esta API visa permitir o gerenciamento eficiente do acervo bibliográfico, dos usuários da biblioteca e de todas as transações de empréstimos, seguindo rigorosamente um conjunto de regras de negócio pré-definidas. [cite: 3]

## Arquitetura e Tecnologia

A API está sendo construída com base na arquitetura **MVC (Model-View-Controller)**, [cite: 2] utilizando **TypeScript** em conjunto com o framework **Express.js**. [cite: 4] Para a persistência dos dados, serão utilizados **arrays em memória**, sem a necessidade de um banco de dados externo. [cite: 4] É importante notar que o projeto proíbe o uso de herança entre classes. [cite: 4]

## Funcionalidades Principais

O sistema permitirá:

* **Gestão de Usuários:** Cadastro, listagem, visualização detalhada, atualização e remoção de membros da biblioteca (professores, alunos, bibliotecários). [cite: 5, 26, 28, 29]
* **Gestão de Livros:** Adição de novos livros ao acervo, listagem, visualização detalhada, atualização de informações e remoção. [cite: 6, 30, 31, 32]
* **Gestão de Estoque:** Controle de exemplares físicos dos livros, com registro de disponibilidade, cadastro, listagem, detalhes, atualização e remoção de exemplares. [cite: 7, 33]
* **Gestão de Empréstimos:** Registro de novas transações de empréstimo e devolução de livros, com validação de regras de negócio específicas. [cite: 8, 34, 35]
* **Catálogos:** Listagem de categorias de usuários, categorias de livros e cursos disponíveis. [cite: 9, 10, 37, 38]

Todas as operações serão expostas através de endpoints RESTful acessíveis via `http://localhost:3090/library`. [cite: 25]
