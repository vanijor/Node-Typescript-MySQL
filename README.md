## Requisitos
* Node.js 22 ou superior - Conferir a versão: node -v.
* MySQL 8 ou superior - Conferir a versão: mysql --version
* GIT - Conferir a versão: git -v

## Sequência para criar o projeto

Criar o arquivo package.
```
npm init
```

Instalar o Express para gerenciar as requisições , rotas e URLs, entre outras funcionalidades.
```
npm i express
```

Instalar os pacotes para suporte ao Typescript.
```
npm i --save-dev @types/express
npm i --save-dev @types/node
```

Instalar o compilador projeto com Typescript e reiniciar o projeto quando o arquivo é modificado.
```
npm i --save-dev ts-node
```

Gerar o arquivo de configuração para o Typescript.
```
npx tsc --init
```

Compilar o arquivo Typescript
```
npx tsc
```

Executar as migrations para criar as tabelas no banco de dados.
```
npx typeorm migration:run -d dist/data-source.js
```

Executar o arquivo gerado com Node.js
```
node dist/index.js
```

Instalar as dependências para conectar o Node.js (Typescript) com o banco de dados.
```
npm install typeorm --save
```

Biblioteca utilizada no Typescript para adicionar metadados (informações adicionais) a classes.
```
npm install reflect-metadata --save
```

Instalar o drive do banco de dados MySQL.
```
npm install mysql2 --save
```

Comando SQL para criar a base de dados.
```
CREATE DATABASE equipamentos CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Criar a migrations que sera usada para criar as tabelas no banco de dados.
```
npx typeorm migration:create src/migration/<nome-da-migration>
```
```
npx typeorm migration:create src/migration/CreateUsersTable
```

Executar as migrations para criar as tabelas no banco de dados.
```
npx typeorm migration:run -d dist/data-source.js
```
