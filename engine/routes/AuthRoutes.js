import express from 'express'
import { google } from '../api/AuthApi.js'
import { session } from '../api/AuthSession.js'

const router = express.Router()

router.post('/google', google)

router.post('/session', session)

export default router