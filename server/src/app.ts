import express, { Application, Request, RequestHandler, Response } from 'express'
import { getEntityById, storeEntity } from './datastore'
import cors from 'cors'
import Multer from 'multer'
import { uploadFile } from './storage'

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // no larger than 5mb
    },
})

const allowedOrigins = ['http://localhost:8080']

const options: cors.CorsOptions = {
  origin: allowedOrigins
}

const app: Application = express()
app.use(cors(options))
app.use(express.json() as RequestHandler)
app.use(express.urlencoded({extended: true}) as RequestHandler)

const port: number = 8081

app.get('/', (req: Request, res: Response) => {
  res.send({ hello: 'there' })
})

app.post('/register', multer.single('userImage'), async (req: Request, res: Response) => {
  const { id, username, password } = req.body

  if (!id || !username || !password) {
    return res.status(400).json({ error: 'Missing required field' })
  }

  // check if ID already exists in DB
  const existingUser = await getEntityById('user', id)
  if (existingUser) {
    return res.status(400).json({ error: 'The ID already exists' })
  }

  // check if username already exists in DB
  if (false) {
    return res.status(400).json({ error: 'The username already exists' })
  }
  
  let userImageUrl: string | void
  // upload the image to cloud storage
  if (req.file) {
      userImageUrl = await uploadFile(req.file, id + '-userimage')
  }

  // all good, store new user in firestore
  try {
    await storeEntity('user', id, { username, password, userImageUrl })
  } catch (err) {
    throw new Error('Error storing new user')
  }

  return res.status(200).json({ id, username, password, userImageUrl })
})

app.post('/auth/login', (req: Request, res: Response) => {
  const { id, password } = req.body
  if (!id || !password) {
    return res.status(400).json({ error: 'ID or password is invalid' })
  }
  // check if user with these credentials exists
  if (false) {
    return res.status(400).json({ error: 'ID or password is invalid' })
  }

  return res
    .status(200)
    .json({ user: { id: '123', username: '123', profileImage: '123' } })
})

app.listen(port, function () {
  console.log(`Listening on port ${port} !`)
})
