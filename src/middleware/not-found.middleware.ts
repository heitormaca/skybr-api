import { Response } from 'express'

export const notFoundHandler = (response: Response) => {
  response.status(404).json({ message: 'Not Found' })
}
