const express = require('express')
const connectDB = require('./config/db')
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS

const app = express()

// Don't redirect if the hostname is `localhost:port` or the route is `/insecure`
app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301))

// Connect Database
connectDB()

// Init middleware
app.use(express.json({ extended: false }))

// Define routes
app.use('/api/users', require('./routes/users'))
app.use('/api/goals', require('./routes/goals'))
app.use('/api/comments', require('./routes/comments'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))