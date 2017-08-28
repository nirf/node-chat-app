const path = require('path')
const express = require('express')

const publicPath = path.join(__dirname, '..',  'public')
const port = process.env.PORT || 3000
const app = express()

//configure our app to use the public path(middleware)
app.use(express.static(publicPath))

app.listen(port, () => {
    console.log(`Started on post ${port}`)
})
