import express from 'express'
import { handleGenerateNewShortUrl } from '../controllers/url.js'
import URL from '../models/url.js'

const router = express.Router()

router.post('/', handleGenerateNewShortUrl)

router.get('/:id', async (req, res) => {
  const shortId = req.params.id
  const entry = await URL.findOneAndUpdate(
    {
      shortId: shortId,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  )

  res.redirect(entry.redirectUrl)
})

export default router
