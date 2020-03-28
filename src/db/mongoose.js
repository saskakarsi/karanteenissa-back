const mongoose = require('mongoose')

mongoose.connect(Buffer.from(process.env.MONGODB_URL, 'base64').toString('utf-8'), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
})

