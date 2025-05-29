import {
  characters as Character,
  PrismaClient,
  users as User,
} from '@prisma/client'
import { CreateUserDTO, CreateUserWithCharacterDTO } from './users.model'

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
  return prisma.users.create({
    data,
  })
}

/**
 * Delete um usuário pelo ID.
 */
export async function deleteUser(userId: string): Promise<User> {
  return prisma.users.delete({ where: { id: userId } })
}

/**
 * Verifica se já existe algum usuário com o email dado.
 */
export async function emailExists(email: string): Promise<boolean> {
  const count = await prisma.users.count({ where: { email } })
  return count > 0
}

/**
 * Verifica se já existe algum usuário com o celular dado.
 */
export async function cellphoneExists(cellphone: string): Promise<boolean> {
  const count = await prisma.users.count({ where: { cellphone } })
  return count > 0
}

/**
 * Cria usuário + character de uma vez, em transação.
 */
export async function createUserWithCharacter(
  data: CreateUserWithCharacterDTO,
): Promise<{ user: User; character: Character }> {
  const { user: u, character: c } = data

  return prisma.$transaction(async (tx) => {
    const newUser = await tx.users.create({ data: u })
    const newChar = await tx.characters.create({
      data: {
        ...c,
        user_id: newUser.id,
      },
    })
    return { user: newUser, character: newChar }
  })
}
