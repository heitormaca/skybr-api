import { NextFunction, Request, Response, Router } from 'express'
import {
  cellphoneExists,
  createUser,
  createUserWithCharacter,
  deleteUser,
  emailExists,
  getAllUsers,
} from './users.service'
import { CreateUserDTO, CreateUserWithCharacterDTO } from './users.model'
import characterRouter from '../characters/characters.router'
import { characterNameExists } from '../characters/characters.service'

export const usersRouter = Router()

// GET /api/users
usersRouter.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await getAllUsers()
      res.json(users)
    } catch (err) {
      next(err)
    }
  },
)

// POST /api/users
usersRouter.post<object, unknown, CreateUserDTO>(
  '/',
  async (req, res, next) => {
    try {
      const { email, cellphone } = req.body
      const errors: string[] = []

      if (await emailExists(email)) errors.push('Email')
      if (await cellphoneExists(cellphone)) errors.push('Celular')

      if (errors.length) {
        const campos = errors.join(' e ')
        const sufixo =
          errors.length === 1 ? ' já cadastrado' : ' já cadastrados'

        res.status(409).json({ message: `${campos}${sufixo}` })
        return
      }

      const user = await createUser(req.body)
      res.status(201).json(user)
    } catch (err) {
      next(err)
    }
  },
)

// POST /api/users/onboard
usersRouter.post<object, unknown, CreateUserWithCharacterDTO>(
  '/onboard',
  async (req, res, next) => {
    try {
      const {
        user: { email, cellphone },
        character: { name },
      } = req.body

      const errors: string[] = []

      if (await emailExists(email)) errors.push('Email')
      if (await cellphoneExists(cellphone)) errors.push('Celular')
      if (await characterNameExists(name)) errors.push('Personagem')

      if (errors.length > 0) {
        const campos = errors.join(' e ')
        const sufixo =
          errors.length === 1 ? ' já cadastrado' : ' já cadastrados'

        res.status(409).json({ message: `${campos}${sufixo}` })
        return
      }

      const result = await createUserWithCharacter(req.body)
      res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  },
)

// DELETE /api/users/:userId
usersRouter.delete(
  '/:userId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params
      await deleteUser(userId)
      res.sendStatus(204)
    } catch (err) {
      next(err)
    }
  },
)

// /api/users/:userId/characters
usersRouter.use('/:userId/characters', characterRouter)
