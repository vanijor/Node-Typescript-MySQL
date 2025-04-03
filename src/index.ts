//importar a biblioteca Express
import express, { Request, Response } from 'express';

//importar o arquivo com as credenciais do banco de dados
import { AppDataSource } from './data-source';

//Criar a aplicação Express
const app = express()

//Inicializar a conexão com o banco de dados
AppDataSource.initialize()
.then(() => {
  console.log('Conexão com o banco de dados realizada com sucesso')
}).catch((error) => {
  console.log('Erro na conexão com o banco de dados: ', error)
})

// Criar a rota GET principal
app.get('/', (req: Request, res: Response) => {
  res.send('Bem vindo, Jorge!')
})

//Iniciar o servidor na porta 8080
app.listen(8080, () => {
  console.log('Servidor iniciado na porta 8080: http://localhost:8080')
})