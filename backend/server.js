const express = require('express')
const server = express()
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const userRouter = require('./src/routes/users/user')
const houseRouter = require('./src/routes/houses/house')

dotenv.config()
const {
    badRequestHandler,
    notFoundHandler,
    genericErrorHandler,
} = require("./src/middleware/errorHandler");


server.use(cors())
server.use(express.json())


server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

server.use("/users", userRouter)
server.use("/houses", houseRouter)


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
