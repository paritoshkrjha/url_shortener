import { nanoid } from 'nanoid'
import URL from '../models/url.js'

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body
  if (!body.url)
    return res.status(400).json({ error: 'Redirect url is required' })
  const shortId = nanoid(8)
  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
  })
  return res.json({ id: shortId })
}

async function handleUrlRedirect(req, res){
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
}

async function handleGetAnalytics(req, res){
  const shortId = req.params.shortId;
  const result = await URL.findOne({
    shortId : shortId
  }) 
  return res.json({
    totalClicks : result.visitHistory.length,
    analytics :  result.visitHistory
  })
}

export {
  handleGenerateNewShortUrl,
  handleUrlRedirect,
  handleGetAnalytics
}
