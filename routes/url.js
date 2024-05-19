import express from 'express'
import { handleGenerateNewShortUrl, handleUrlRedirect, handleGetAnalytics } from '../controllers/url.js'
import URL from '../models/url.js'

const router = express.Router()

router.post('/', handleGenerateNewShortUrl)

router.get('/:id', handleUrlRedirect)

router.get('/analytics/:shortId',handleGetAnalytics)

export default router
