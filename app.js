const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World!'
    })
})


let PORT = Process.env.PORT
app.listen(PORT, ()=>{
    console.log(`server is running on PORT ${PORT}`)
})