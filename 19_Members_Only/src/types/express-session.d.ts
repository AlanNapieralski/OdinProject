import { User as MyUser } from './types.js'

declare global {
  namespace Express {
    interface User extends MyUser { }
  }
}

declare module 'express-session' {
  interface SessionData {
    message?: string; // Add your custom properties here
    // Add more custom properties as needed
  }
}
