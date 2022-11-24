const moongoose = require('mongoose')

const connectDB = async () => {
    try {
        await moongoose.connect(`mongodb+srv://Ebook4U:Ebook4U8@ebook4u.6vrzeqe.mongodb.net/?retryWrites=true&w=majority`, {
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        })

        console.log('MongoDB connected successfully!')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

// connect database mongodb
module.exports = connectDB