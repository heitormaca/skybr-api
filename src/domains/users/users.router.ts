import { NextFunction, Request, Response, Router } from 'express'
import { createUser, getAllUsers } from './users.service'
import { CreateUserDTO } from './users.model'
import characterRouter from '../characters/characters.router'

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
usersRouter.post(
  '/',
  async (
    req: Request<object, unknown, CreateUserDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const user = await createUser(req.body)
      res.status(201).json(user)
    } catch (err) {
      next(err)
    }
  },
)

// /api/users/:userId/characters
usersRouter.use('/:userId/characters', characterRouter)
