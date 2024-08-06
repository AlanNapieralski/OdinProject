import { User as MyUser } from './types.js'

declare global {
  namespace Express {
    interface User extends MyUser { }
  }
}
