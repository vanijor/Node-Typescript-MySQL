//Importar a biblioteca Express
import express, { Request, Response } from "express";
//Importar a conexão
import { AppDataSource } from "../data-source";
//Importar entidade
import { User } from "../entity/User";
import { Not } from "typeorm";
//Criar a aplicação Express
const router = express.Router();

//Criar a rota para listar usuários
//Endereço para acessar a api atraves da aplicacao externa com o verbo GET:http://localhost:8080/users
router.get("/users", async (req: Request, res: Response) => {
  try {
    //Criar uma instância do repositorio de User
    const userRepository = AppDataSource.getRepository(User);
    //Recupera todos os usuários do banco de dados
    const users = await userRepository.find();
    //Retorna os usuários como resposta
    res.status(200).json(users);
    return;
  } catch (error) {
    //Retornar erro em caso de falha
    res.status(500).json({
      message: "Erro em listar os usuários!",
    });
    return;
  }
});

//Criar a rota para visualizar um usuário
//Endereço para acessar a api atraves da aplicacao externa com o verbo GET:http://localhost:8080/users/id
router.get("/users/:id", async (req: Request, res: Response) => {
  try {
    //Obter o ID do usuário a partir dos parametros da requisição
    const { id } = req.params;

    //Obter o repositorio da entidade Useer
    const userRepository = AppDataSource.getRepository(User);

    //Buscar o usuário no banco de dados
    const user = await userRepository.findOneBy({ id: parseInt(id) });

    //Verificar se o usuário foi encontrado
    if (!user) {
      res.status(404).json({
        message: "Usuário não encontrado!",
      });
      return;
    }

    res.status(200).json({
      user: user,
    });
    return;
  } catch (error) {
    //Retornar erro em caso de falha
    res.status(500).json({
      message: "Erro ao visualizar o usuário!",
    });
    return;
  }
});

//Criar a rota para cadastrar usuário
//Endereço para acessar a api atraves da aplicacao externa com o verbo POST:http://localhost:8080/users
//A aplicação externa deve indicar que está enviando os dados em formato de objeto: Content-Type: application/json
/*
{
  "name": "Jorge"
  "email": "jorge@jorge.com"
}
*/

router.post("/users", async (req: Request, res: Response) => {
  try {
    //Receber os dados enviados no corpo da requisição
    var data = req.body;

    //Criar uma instancia do repositorio User
    const userRepository = AppDataSource.getRepository(User);

    //Recuperar o registro do banco de dados com o valor da coluna email
    const existingUser = await userRepository.findOne({
      where: { email: data.email },
    });

    if (existingUser) {
      res.status(400).json({
        message: "Já existe usuário cadastrado com esse email",
      });
      return;
    }
    //Criar um novo registro
    const newUser = userRepository.create(data);

    //Salvar o registro no banco de dados
    await userRepository.save(newUser);

    //Retornar resposta de sucesso
    res.status(201).json({
      message: "Usuário cadastrado com sucesso",
      user: newUser,
    });
  } catch (error) {
    //Retornar erro em caso de falha
    res.status(500).json({
      message: "Erro em cadastrar o usuário!",
    });
  }
});

//Criar a rota para editar usuário
//Endereço para acessar a api atraves da aplicacao externa com o verbo PUT:http://localhost:8080/users/id
//A aplicação externa deve indicar que está enviando os dados em formato de objeto: Content-Type: application/json
/*
{
  "name": "Jorge"
  "email": "jorge@jorge.com"
  }
  */

router.put("/users/:id", async (req: Request, res: Response) => {
  try {
    // Obter o ID do usuário a partir dos parametros da requisição
    const { id } = req.params;

    //Receber os dados enviados no corpo da requisição
    const data = req.body;

    //Obter o repositorio da entidade User
    const userRepository = AppDataSource.getRepository(User);

    //Buscar o usuário no banco de dados
    const user = await userRepository.findOneBy({ id: parseInt(id) });

    //Verificar se o usuário foi encontrado
    if (!user) {
      res.status(404).json({
        message: "Usuário não encontrado!",
      });
      return;
    }

    //Verificar se já existe outro usuário com o mesmo email, mas que não seja o registro atual
    const existingUser = await userRepository.findOne({
      where: {
        email: data.email,
        id: Not(parseInt(id)), //Exclui o próprio resgistro da busca
      },
    });

    //Verificar se o usuário foi encontrado
    if (existingUser) {
      res.status(400).json({
        message: "Já existe um usuário com esse email!",
      });
    }

    //Atualizar os dados do usuário
    userRepository.merge(user, data);

    //Salvar as alterações no banco de dados
    const updateUser = await userRepository.save(user);

    res.status(200).json({
      message: "Usuário atualizado com sucesso!",
      data: updateUser,
    });
  } catch (error) {
    //Retornar erro em caso de falha
    res.status(500).json({
      message: "Erro em editar o usuário!",
    });
  }
});

//Criar a rota para apagar usuário
//Endereço para acessar a api atraves da aplicacao externa com o verbo PUT:http://localhost:8080/users/id

router.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    //Obter o id do usuário
    const id = req.params.id;

    //Obter o repositorio da entidade User
    const userRepository = AppDataSource.getRepository(User);

    //Buscar o usuário no banco de dados
    const user = await userRepository.findOneBy({ id: parseInt(id) });

    //Verificar se o usuário foi encontrado
    if (!user) {
      res.status(404).json({
        message: "Usuário não encontrado!",
      });
      return;
    }

    //Remover o usuário do banco de dados
    await userRepository.delete(user);
    res.status(200).json({
      message: "Usuário deletado com sucesso!",
      data: user,
    });

  } catch (error) {
    //Retornar erro em caso de falha
    res.status(500).json({
      message: "Erro em deletar o usuário!",
    });
  }

});

//Exportar a instrução que esta dentro da constante router
export default router;
