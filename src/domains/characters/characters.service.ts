import { characters as Character, PrismaClient } from '@prisma/client'
import { CreateCharacterDTO } from './characters.model'

const prisma = new PrismaClient()

/**
 * Retorna todos os Characters de um dado userId.
 */
export async function getCharactersByUser(
  userId: string,
): Promise<Character[]> {
  return prisma.characters.findMany({
    where: { user_id: userId },
  })
}

/**
 * Cadastra um novo character para um dado userId.
 */
export async function createCharacterForUser(
  userId: string,
  data: CreateCharacterDTO,
): Promise<Character> {
  return prisma.characters.create({
    data: {
      ...data,
      user_id: userId,
    },
  })
}
