import express from 'express'
import {router} from './routes/url.js'

const app = express()
const PORT = 8001

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
