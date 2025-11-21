
# Fortmarket

Um site para fãs do jogo fortnite conferirem todos os cosméticos do modo BattleRoyal e também conferirem quais são os cosméticos atualmente em venda, incluindo seu preço.


## Stack utilizada

**Front-end:** React, NextJS, TailwindCSS, shadcn/ui, SWR, Zod, jsonpath-plus.

**Back-end:** Node, Express, Prisma ORM, Bcrypt, jsonwebtoken.


## Decisões Técnicas

#### PrismaORM
Visando uma boa comunicação e integridade dos dados, foi decidido utilizar uma biblioteca de ORM para realizar as transações do banco de dados, sendo a PrismaORM uma biblioteca robusta e que simplifica o tratamento dos dados e consulta, bem como a conexão com o banco.

#### Json Webtoken e Bcrypt
Para tratar a sessão e as rotas protegidas, um cookie contendo um json webtoken foi aplicado, visando proteger e não permitindo o acesso por aqueles não autorizados a informações do usuário, motivo também pelo qual foi optado por encriptar a senha no banco de dados, utilizando-se de um hash. Desta forma mesmo que haja algum vazamento de dados, as credenciais do usuário não ficam comprometidas.

#### NextJs
Visando um desenvolvimento rápido, com opção de escalabilidade e uma navegação mais leve e otimizada para o usuário final, foi utilizo NextJs, possibilitando também a utilização de bibliotecas como shadcn/ui e tailwindcss para trabalhar a componentização e customização das telas e layouts. Devido a forma como o NextJs trata separadamente a renderização de componentes do servidor e do cliente, uma biblioteca que permitisse que os dados fossem buscados da Api do Fortnite-api foi necessária, dessa forma foi optado pela SWR (por recomendação da documentação oficial do NextJs) e pela jsonpath-plus para filtrar o json recebido pela Api através da [RFC 9535 ](https://www.rfc-editor.org/rfc/rfc9535.html).

#### Zod
Para melhor tratar os formulários de login e registro, a biblioteca Zod foi utilizada para definir o esquema dos dados do formulário, suas regras de negócio como número mínimo de carateres para a senha e formatação do campo de email, e sua validação para envio ao backend, tornando mais simples o controle dos campos para sinalização de preenchimento incorreto ou relatório de erro.
## Funcionalidades

### Front-end
- Navegação paginada dos items da loja e cosméticos
- Criação de usuário e sistema de login
- Visualização dos items contendo seus detalhes

### Back-end
- Encriptação da senha do usuário no banco de dados
- Sessão com json webtoken através de cookie,
- Comunicação da aplicação com o banco de dados por ORM, melhorando a integridade dos dados



## Instalação

Instale fortmakert com npm

### Back-end
```bash
  cd fortserver
  npm install
```
Criar um banco de dados sql chamado "fortmarket"e apos isso executar o comando:
```bash
  npx prisma db push
```
para formatar o banco de dados de acordo com as tabelas definidas no PrismaORM.

### Front-end
```bash
  cd fortmarket
  npm install
```
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env do back-end:

`SALTROUNDS`: número de salts da encriptação da senha.

`JWT_SECRET_KEY`: o segredo do json webtoken que será gerado.

`PORT`: a porta em que o back-end vai ser executado.

`NODE_ENV`: se definido como 'development', será executado como perfil de desenvolvimento, caso não seja o desejado basta não declarar.

`DATABASE_URL`: formatado como "mysql://[usuário]:[senha]@localhost:[porta]/fortmarket"
## Documentação da API
Algumas rotas são protegidas via login, resultando em um status http 401 caso o usuário não esteja logado.

### Credenciais

#### Retorna todos os usuários cadastrados
```http
  GET /credenciais/data/
```
Necessário estar logado para que o cookie com a sessão do json webtoken seja validado.

Retorna um status http 200 e um json com as informações dos usuários em caso de sucesso ou retorna http 500 em caso de falha.

#### Retorna as credenciais do usuários logado

```http
  POST /credenciais/data/
```
Necessário estar logado para que o cookie com a sessão do json webtoken seja validado e a api pegue o email do usuário.

Retorna um status http 200 e um json com as informações do usuário em caso de sucesso ou retorna http 500 em caso de falha.

#### Atualiza a senha usuários logado

```http
  POST /credenciais/updateSenha/
```
Necessário estar logado para que o cookie com a sessão do json webtoken seja validado.

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `senha`      | `string` | **Obrigatório**. A nova senha que você quer |

Retorna um status http 200 e um json com as informações atualizadas do usuário em caso de sucesso ou retorna http 500 em caso de falha.

#### Realiza login do usuário

```http
  POST /credenciais//login/auth
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | **Obrigatório**. Email do usuário |
| `senha`      | `string` | **Obrigatório**. Senha do usuário |

Retorna um status http 200 e um cookie com id e email do usuário logado e um jsonwebtoken em caso de sucesso ou retorna http 500 em caso de falha.

#### Realiza cadastro do usuário

```http
  POST /credenciais//login/auth
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `nome`       | `string` | **Obrigatório**. Nome do usuário |
| `email`      | `string` | **Obrigatório**. Email do usuário |
| `senha`      | `string` | **Obrigatório**. Senha do usuário |

Retorna um status http 200 e um json com os dados do usuário logado e em caso de sucesso ou retorna http 422 caso o email provido já esteja cadastrado.

#### Limpa o cookie de login do cliente

```http
  POST /credenciais/logout/
```
Necessário estar logado para que o cookie com a sessão do json webtoken seja validado.

### Inventário

#### Retorna os items em todos os Inventários

```http
  GET /inventario/data/
```
Retorna um status http 200 e um json com as informações dos items em inventário em caso de sucesso ou retorna http 500 em caso de falha.

#### Retorna os items do inventário do usuário logado

```http
  POST /inventario/data/
```
Necessário estar logado para que o cookie com a sessão do json webtoken seja validado.

Retorna um status http 200 e um json com as informações dos items em inventário em caso de sucesso ou retorna http 500 em caso de falha.

#### Insere o item no inventário do usuário logado

```http
  POST /inventario/insertItem/
```
Necessário estar logado para que o cookie com a sessão do json webtoken seja validado.

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `itemId`     | `string` | **Obrigatório**. Id do item |
| `valor`      | `int` | **Obrigatório**. Valor do item em Vbucks |

Atualiza o saldo do usuário, insere o item em seu invétário e o inclui no histórico de transações, sendo o código 0 para compra de items. 

Retorna um status http 200 e um json com as informações do item em inventário, do usuário e da transação em caso de sucesso ou retorna http 500 em caso de falha, caso o item já esteja no inventário do usuário um http 422 é retornado com a mensagem "Item já inserido em invetário" ou caso o usuário não tenha saldo suficiente para realizar a transação, retornando uma mensagem "Saldo insuficiente".

#### Remove o item no inventário do usuário logado

```http
  POST /inventario/insertItem/
```
Necessário estar logado para que o cookie com a sessão do json webtoken seja validado.

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `itemId`     | `string` | **Obrigatório**. Id do item |

Atualiza o saldo do usuário, remove o item em seu invétário e o inclui no histórico de transações, sendo o código 1 para venda de items. 

Retorna um status http 200 e um json com as informações do item em inventário, do usuário e da transação em caso de sucesso ou retorna http 500 em caso de falha.

### Transações

#### Retorna todas as transações do usuário logado

```http
  GET /transacoes/data/
```
Necessário estar logado para que o cookie com a sessão do json webtoken seja validado.

Retorna um status http 200 e um json com as informações dos items em inventário em caso de sucesso ou retorna http 500 em caso de falha.
