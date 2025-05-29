import { character_class } from '@prisma/client'

export interface CreateCharacterDTO {
  name: string
  class: character_class
  level: number
  is0800enable: boolean
}
