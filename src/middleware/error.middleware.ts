/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ErrorRequestHandler } from 'express'
import { HttpError } from '../errors/http-error'

export const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({ message: err.message })
    return
  }

  console.error(err)
  res.status(500).json({ message: 'Internal Server Error' })
}
