import { Request } from 'express'

declare module 'express-serve-static-core' {
  interface Request {
    context: {
      models: {
        users: Data<User>,
        messages: Data<Message>
      },
      me: User

    }
  }
}
