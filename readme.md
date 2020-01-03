# OnePost

Webapp Full-stack, com objetivo de ser uma rede social, onde usuários cadastrados podem escrever e curtir publicações.

## Instalação e Configuração

### Prerequisitos

Exige que você tenha o [Node.js](https://nodejs.org/) e [MongoDB](https://www.mongodb.com/download-center) instalados em sua máquina.

### Instalação

Copie o repositório para sua máquina, podendo ser de duas formas:

- Baixando pelo GitHub.

- Clonando usando esse [link](https://github.com/cleberson-dev/onepost.git) no CLI do Git:

  ```bash
  git clone https://github.com/cleberson-dev/onepost.git
  ```

  

Instale as dependências necessárias para o funcionado do app:

```bash
npm install
```

Dentro do diretório do repositório, execute o script para executar a aplicação no modo desenvolvedor:

```bash
npm run dev
# ou
yarn dev # caso tenha yarn instalado
```

Seja feliz!

### Configuração

- As variáveis de ambiente estão sendo providas em um arquivo `.env`  na raíz do projeto.

- Por padrão, a aplicação usará um banco de dados MongoDB local (`'mongodb://localhost:27017/onepost`). Mas você pode prover um URL personalizado para um de sua escolha através da variável de ambiente `MONGODB_URL`.







## :hammer: Construído com 

- [Javascript](https://www.javascript.com/) - Linguagem de Programação no Front-end e Back-end ([Node.js](https://nodejs.org/))
- [Typescript](https://www.typescriptlang.org/) - Extensão do JS (tipos, interfaces, etc...)
- [Express.js](https://expressjs.com/) - Server (Back-end) Framework
- [React.js](https://reactjs.org/) - UI (Front-end) Framework
- [MongoDB](https://www.mongodb.com/) - Banco de Dados (NoSQL)



## Observações

- Qualquer sugestão, conselho é bem vindo! Estou aberto para a comunidade! :smile:
- Existem algumas inconsistências na UI que serão futuramente corrigidas.
- É um dos meus primeiros 'GRANDES' projetos full-stack. Todo o processo (elicitação, definição e análise de requisitos; design; implementação, etc...) foi bem desafiador e me desmotivou bastante durante o processo, mas consegui contornar e terminá-lo.
- Próximo passo é realizar testes. Aprendi recentemente TDD, bem antes do início desse projeto, portanto não foi possível construí-lo inicialmente com essa prática. Mas depois dos testes, a ideia é manter com TDD.
- Quero dicas para a documentação do meu README. Documentação é importante, então quero que me informem o que pode ficar mais claro, o que ainda é preciso para um ótimo README, etc...
- Configurá-lo para pronta implementação é um dos próximos passos a seguir.





## ✍️ Contribuidores

- [@cleberson-dev](https://github.com/cleberson-dev/) - Ideia e Trabalho Inicial



