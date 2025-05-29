import { NextFunction, Request, Response, Router } from 'express'
import {
  createCharacterForUser,
  getCharactersByUser,
} from './characters.service'
import { CreateCharacterDTO } from './characters.model'

const router = Router({ mergeParams: true })

// GET /api/users/:userId/characters
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params
    const chars = await getCharactersByUser(userId)
    res.json(chars)
  } catch (err) {
    next(err)
  }
})

// POST /api/users/:userId/characters
router.post(
  '/',
  async (
    req: Request<{ userId: string }, unknown, CreateCharacterDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { userId } = req.params
      const character = await createCharacterForUser(userId, req.body)
      res.status(201).json(character)
    } catch (err) {
      next(err)
    }
  },
)

export default router
