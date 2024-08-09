type User = {
  id: string
  username: string
}
type Message = {
  id: string
  text: string
  userId: string
}

type Data<T> = { [key: string]: T }

