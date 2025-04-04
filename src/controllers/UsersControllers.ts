//Importar a biblioteca Express
import express, { Request, Response } from 'express';
//Importar a conexão
import { AppDataSource } from '../data-source';
//Importar entidade
import { User } from '../entity/User';
//Criar a aplicação Express
const router = express.Router();

//Criar a rota para listar usuários
//Endereço para acessar a api atraves da aplicacao externa com o verbo GET:http://localhost:8080/users
router.get('/users', async (req: Request, res: Response) => {
  try {
    //Criar uma instância do repositorio de User
    const userRepository = AppDataSource.getRepository(User);
    //Recupera todos os usuários do banco de dados
    const users = await userRepository.find();
    //Retorna os usuários como resposta
    res.status(200).json(users)
    return

  } catch (error) {
    //Retornar erro em caso de falha
    res.status(500).json({
      message: 'Erro em listar os usuários!',
    })
    return
  }
})

//Criar a rota para cadastrar usuário
//Endereço para acessar a api atraves da aplicacao externa com o verbo POST:http://localhost:8080/users
//A aplicação externa deve indicar que está enviando os dados em formato de objeto: Content-Type: application/json
/*
{
  "name": "Jorge"
  "email": "jorge@jorge.com"
}
*/

router.post('/users', async (req: Request, res: Response) => {
  try {
    //Receber os dados enviados no corpo da requisição
    var data =req.body

    //Criar uma instancia do repositorio User
    const userRepository = AppDataSource.getRepository(User);

    //Recuperar o registro do banco de dados com o valor da coluna email
    const existingUser = await userRepository.findOne({ where: { email: data.email } });

    if (existingUser) {
      res.status(400).json({
        message: 'Já existe usuário cadastrado com esse email',
      })
      return
    }
    //Criar um novo registro
    const newUser = userRepository.create(data)

    //Salvar o registro no banco de dados
    await userRepository.save(newUser);

    //Retornar resposta de sucesso
    res.status(201).json({
      message: 'Usuário cadastrado com sucesso',
      user: newUser,
    })
    
  } catch(error) {
    //Retornar erro em caso de falha
    res.status(500).json({
      message: 'Erro em cadastrar o usuário!',
    })
  }
})

//Exportar a instrução que esta dentro da constante router
export default router;