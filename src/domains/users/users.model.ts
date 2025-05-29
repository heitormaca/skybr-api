import { user_status } from '@prisma/client'

export interface CreateUserDTO {
  full_name: string
  cellphone: string
  email: string
  game_availability: number
  status: user_status
  id_teamspeak?: string
}
