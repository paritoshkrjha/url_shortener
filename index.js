import express from 'express'
import urlRoute from './routes/url.js'
import connectToMongoDB from './connect.js'

const app = express()
const PORT = 8001

connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
  .then(() => {
    console.log('Successfully connected to MongoDB')
  })
  .catch(() => {
    console.log('Something went wrong')
  })
app.use(express.json())
app.use('/url', urlRoute)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
