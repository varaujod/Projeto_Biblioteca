## Projeto II - Gestão de Biblioteca Acadêmica

Este projeto é uma atividade de avaliação da disciplina de Programação Web, parte do Curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas do Instituto Federal de São Paulo (IFSP), Câmpus Boituva. A disciplina é ministrada pelo **Prof. Dr. Anisio Silva**. 

## Objetivo do Projeto

O principal objetivo é desenvolver uma API (Interface de Programação de Aplicações) para a gestão completa de uma biblioteca acadêmica. Esta API visa permitir o gerenciamento eficiente do acervo bibliográfico, dos usuários da biblioteca e de todas as transações de empréstimos, seguindo rigorosamente um conjunto de regras de negócio pré-definidas.

## Arquitetura e Tecnologia

A API está sendo construída com base na arquitetura **MVC (Model-View-Controller)**, utilizando **TypeScript** em conjunto com o framework **Express.js**. Para a persistência dos dados, serão utilizados **arrays em memória**, sem a necessidade de um banco de dados externo. É importante notar que o projeto proíbe o uso de herança entre classes. Na segunda versão, a persistência dos dados, foi utilizado o SGDB MySQL, com a implementação direta de queries SQL, sem o uso de um ORM (Object-Relational Mapping). É importante notar que o projeto proíbe o uso de herança entre classes. A documentação da API será realizada utilizando Swagger, garantindo clareza e facilidade de consumo dos endpoints.

## Funcionalidades Principais

O sistema permitirá:

* **Gestão de Usuários:** Cadastro, listagem, visualização detalhada, atualização e remoção de membros da biblioteca (professores, alunos, bibliotecários). 
* **Gestão de Livros:** Adição de novos livros ao acervo, listagem, visualização detalhada, atualização de informações e remoção. 
* **Gestão de Estoque:** Controle de exemplares físicos dos livros, com registro de disponibilidade, cadastro, listagem, detalhes, atualização e remoção de exemplares. 
* **Gestão de Empréstimos:** Registro de novas transações de empréstimo e devolução de livros, com validação de regras de negócio específicas.
* **Catálogos:** Listagem de categorias de usuários, categorias de livros e cursos disponíveis. 

Todas as operações serão expostas através de endpoints RESTful acessíveis via `http://localhost:3090/library`.
