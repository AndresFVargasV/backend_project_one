const express = require('express')
const cors = require('cors')
const app = express()

// Enable CORS
app.use(cors())

// Define the main route
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000')
})