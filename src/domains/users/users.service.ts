import { PrismaClient, users as User } from '@prisma/client'
import { CreateUserDTO } from './users.model'

const prisma = new PrismaClient()

/**
 * Retorna todos os usuários cadastrados.
 */
export async function getAllUsers(): Promise<User[]> {
  return prisma.users.findMany({
    orderBy: { created_at: 'desc' },
  })
}

/**
 * Cadastra um novo usuário.
 */
export async function createUser(data: CreateUserDTO): Promise<User> {
  return prisma.users.create({ data })
}
