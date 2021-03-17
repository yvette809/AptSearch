const express = require('express')
const server = express()
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()







const port = process.env.PORT || 5001

mongoose
    .connect(
        `${process.env.MONGO_URI}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(
        server.listen(port, () => {
            console.log(`something is running on port ${port}`);
        })
    )
    .catch((error) => console.log(error));
