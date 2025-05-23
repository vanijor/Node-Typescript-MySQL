//importar a biblioteca Express
import express, { Request, Response } from 'express';

//importar a biblioteca que permiti conexão externa
import cors from 'cors';

//Criar a aplicação Express
const app = express()

//Criar um middleware para receber os dados no corpo da requisição
app.use(express.json())

//Criar um middleware para permitir requisição externa
app.use(cors());

//Incluir as Controllers
import UsersController from './controllers/UsersControllers'

//Criar as rotas
app.use('/', UsersController)

// Criar a rota GET principal
app.get('/', (req: Request, res: Response) => {
  res.send('Bem vindo, Jorge!')
})

//Iniciar o servidor na porta 8080
app.listen(8080, () => {
  console.log('Servidor iniciado na porta 8080: http://localhost:8080')
})