import express, { Application, Request, RequestHandler, Response } from 'express'
import { getEntity, getEntityById, getLatestPosts, getLoginUser, storeEntity } from './firestore'
import cors from 'cors'
import Multer from 'multer'
import { uploadFile } from './storage'
import { v4 as uuidv4 } from 'uuid'

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // no larger than 5mb
    },
})

const allowedOrigins = ['http://localhost:8080', 'https://steph-ridnell-ass-1.ts.r.appspot.com']

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
    return res.status(400).json({ msg: 'Missing required field' })
  }

  // check if ID already exists in DB
  const userById = await getEntityById('user', id)
  if (userById) {
    return res.status(400).json({ msg: 'The ID already exists' })
  }

  // check if username already exists in DB
  const userByUsername = await getEntity('user', 'user_name', username)
  if (userByUsername) {
    return res.status(400).json({ msg: 'The username already exists' })
  }
  
  let userImageUrl: string | void
  // upload the image to cloud storage
  if (req.file) {
      userImageUrl = await uploadFile(req.file, id + '-userimage')
  }

  // all good, store new user in firestore
  try {
    await storeEntity('user', id, { user_name: username, password, user_image: userImageUrl })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ msg: 'Unexpected error occurred' })
  }

  return res.status(200).json({ id, username, password, userImageUrl })
})

app.post('/auth/login', async (req: Request, res: Response) => {
  const { id, password } = req.body
  if (!id || !password) {
    return res.status(400).json({ msg: 'ID or password is invalid' })
  }

  // check if username already exists in DB
  const userByUsername = await getLoginUser(id, password)
  if (!userByUsername) {
    return res.status(400).json({ msg: 'ID or password is invalid' })
  }

  return res
    .status(200)
    .json({ user: {...userByUsername, id, password: undefined } })
})

app.post('/post', multer.single('image'), async (req: Request, res: Response) => {
  const { subject, messageText, userId } = req.body

  if (!subject) {
    return res.status(400).json({ msg: 'Message must include a subject' })
  }
  
  let imageUrl: string | void
  // upload the image to cloud storage
  if (req.file) {
      imageUrl = await uploadFile(req.file, 'message')
  }

  // all good, store new user in firestore
  try {
    await storeEntity('message', uuidv4(), {
      subject,
      message_text: messageText,
      image: imageUrl,
      created_by: userId,
      created_at: new Date().getTime()
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ msg: 'Unexpected error occurred' })
  }

  return res.sendStatus(200)
})

app.get('/latest-posts', async (req: Request, res: Response) => {
  try {
    const posts = await getLatestPosts()
    return res.status(200).json({ posts })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ msg: 'Unexpected error occurred' })
  }
})

app.listen(port, function () {
  console.log(`Listening on port ${port} !`)
})
