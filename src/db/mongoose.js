const mongoose = require('mongoose')

const dbConn = async function () {
    try {
        const url = Buffer.from(process.env.MONGODB_URL, 'base64').toString('utf-8')
        mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology:true
        })
        console.log(`Connected to ${url}`)
    }  catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = dbConn
