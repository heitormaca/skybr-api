import { Response } from 'express'

export const notFoundHandler = (_req: Request, response: Response) => {
  response.status(404).json({ message: 'Not Found' })
}
