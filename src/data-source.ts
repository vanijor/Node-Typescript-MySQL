import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "123123",
  database: "equipamentos",
  synchronize: true,
  logging: true,
  entities: [],
  subscribers: [],
  migrations: [],
})