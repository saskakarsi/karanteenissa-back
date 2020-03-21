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

{
    id: 0,
    langs: {
      fi: {
        title: '--TITLE--',
        desc: '--DESCRIPTION--'
      },
      en: {
        title: '--TITLE--',
        desc: '--DESCRIPTION--'
      },
      sv: {
        title: '--TITLE--',
        desc: '--DESCRIPTION--'
      }
    },
    link: '--LINK--',
    img_src: '../img/--IMAGE--.png',
    locations: [
      '--LOCATION--'
    ],
    category: '--CATEGORY--'
  }