const express = require('express');


const app = express();

const PORT = process.env.PORT || 3010

app.use(express.static('../../pages'))

app.get('/', (req, res) => {
})


app.listen(PORT, err => {
    if (err) {
        console.log('Error')
    }
})