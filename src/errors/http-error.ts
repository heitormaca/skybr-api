/**
 * Erro HTTP customizado, com código e mensagem.
 */
export class HttpError extends Error {
  public readonly statusCode: number

  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
    // mantém a stack trace correta no V8
    Error.captureStackTrace(this, this.constructor)
  }
}
