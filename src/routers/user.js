const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const auth = require('../middleware/auth')
const { sendWelcomeEmail, sendCancellationEmail } = require('../emails/account.js')
const router = new express.Router()

router.post('/', async (req, res) => {
    const user = new User(req.body)
    // If func being waited rejects exec stops
    try {
        await user.save()
        sendWelcomeEmail(user.email, process.env.SYSTEM_EMAIL, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email, req.body.password
            )
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/me', auth, async (req, res) => {
    res.send(req.user)
})

router.patch('/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name',
                            'email',
                            'password',
                            'age']
    const isValidOp = updates.every((update) => {
        return allowedUpdates.includes(update)
    })
    if (!isValidOp) {
        return res.status(400).send({ 
            error: 'Invalid update, key(s) not found.'
        })
    }
    try {
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        if (e.name === 'ValidationError') {
            return res.status(400).send({error: "Validation error"})
        }
        res.status(400).send()
    }
})

router.delete('/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        sendCancellationEmail(req.user.email, process.env.SYSTEM_EMAIL, req.user.name)
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router