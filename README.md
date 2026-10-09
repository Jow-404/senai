# Biblioteca Aurora

Protótipo de um sistema web para apoiar a gestão de uma biblioteca escolar. A interface reúne o resumo das atividades e áreas para consultar o acervo, acompanhar empréstimos, encontrar alunos e visualizar relatórios demonstrativos.

## Funcionalidades

- **Visão geral:** indicadores da biblioteca, gráfico semanal, empréstimos recentes e devoluções em atraso.
- **Acervo:** busca por título, autor ou categoria; formulário para cadastrar títulos e exemplares.
- **Empréstimos:** consulta dos empréstimos, busca por aluno, turma ou livro e formulário para registrar uma retirada.
- **Alunos:** busca por nome ou turma e formulário para cadastrar estudantes.
- **Relatórios:** indicadores demonstrativos de títulos populares, turmas leitoras e devoluções no prazo.
- **Layout responsivo:** navegação adaptada para telas menores.

Os formulários de cadastro e empréstimo atualizam as listas durante a sessão atual do navegador.

## Tecnologias

- React 18
- Vite 6
- Lucide React para ícones
- CSS responsivo

## Requisitos

- Node.js 18 ou superior
- npm

## Como executar

Na raiz do projeto, instale as dependências e inicie o servidor de desenvolvimento:

```bash
npm install
npm run dev
```

O Vite exibirá no terminal o endereço local, normalmente `http://localhost:5173`.

## Comandos

```bash
npm run dev      # inicia o servidor de desenvolvimento
npm run build    # gera a versão de produção em dist/
npm run preview  # disponibiliza localmente a versão gerada
```

## Estrutura

```text
.
├── index.html       # documento HTML de entrada
├── src/
│   ├── App.jsx      # telas, dados demonstrativos e interações
│   ├── main.jsx     # inicialização do React
│   └── styles.css   # estilos e regras responsivas
├── package.json     # dependências e scripts npm
└── package-lock.json
```

## Limitações do protótipo

Os dados são exemplos definidos no frontend. Cadastros e empréstimos ficam somente no estado do React e são perdidos ao recarregar a página. O projeto ainda não tem API, banco de dados, autenticação, permissões ou persistência. Os números e relatórios são ilustrativos, não indicadores calculados a partir dos registros. Fontes e imagem do destaque são carregadas de serviços externos e dependem de conexão com a internet.

Para uso real, será necessário integrar um backend e definir regras de negócio para disponibilidade de exemplares, prazos, devoluções e acesso dos usuários.