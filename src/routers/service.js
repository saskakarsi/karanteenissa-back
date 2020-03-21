const express = require('express')
const Service = require('../models/Service')
const auth = require('../middleware/auth')
const router = new express.Router()

router.get('/services', async (req, res) => {
    try {
        const services = await Service.find({})
        res.send({ services })
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/services', auth, async (req, res) => {
    const service = new Service(req.body)
    // If func being waited rejects exec stops
    try {
        await service.save()
        res.status(201).send({ service })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/services/:serviceId', auth, async (req, res) => {
    try {
        const svc = await Service.findOneAndDelete({ _id: req.query.serviceId })
        res.send({ deleted: svc })
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router