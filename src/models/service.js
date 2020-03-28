const mongoose = require('mongoose')

const infoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
})

const serviceSchema = new mongoose.Schema({
    langs: {
        fi: {
            type: infoSchema, 
            required: true
        },
        se: {
            type: infoSchema, 
            required: true
        },
        gb: {
            type: infoSchema, 
            required: true
        },
    },
    link: {
        type: String,
        required: true
    },
    img_src: {
        type: String,
        required: true
    },
    locations: {
        type: [String],
        required: true
    },
    category: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})

const Service = mongoose.model('Service', serviceSchema)

module.exports = Service
