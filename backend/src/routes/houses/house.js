const express = require('express')
const houseRouter = express.Router()
const houseModel = require('./houseModel')
const { auth, admin } = require("../../middleware/authMiddleware");

// get all houses

houseRouter.get("/", async (req, res, next) => {
    try {
        const houses = await houseModel.find(req.query).populate("user", ["name", "image"])
        res.status(200).json({
            success: true,
            count: houses.length,
            data: houses
        })
    } catch (error) {
        next(error)

    }
})


// get houses by id
houseRouter.get("/:id", async (req, res, next) => {
    try {
        const house = await houseModel.findById(req.params.id).populate("user", ["name", "image"])
        if (house) {
            res.status(200).send(house)
        } else {
            const error = new Error(`house with id ${req.params.id}  not found`)
            error.httpStatusCode = 404
            next(error)
        }

    } catch (error) {
        next(error)
    }
})

// post a house
houseRouter.post("/", auth, async (req, res, next) => {
    const house = await new houseModel({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        selfContained: req.body.selfContained,
        image: req.body.image,
        telephone: req.body.telephone,
        location: req.body.location,
        user: req.user.id

    })
    const savedHouse = house.save()
    res.status(201).send(savedHouse)
})


// delete house
houseRouter.delete("/:id", auth, async (req, res, next) => {
    try {
        const house = await houseModel.findById(req.params.id)
        if (house) {
            house.remove()
            res.status(200).send(`house with id ${req.params.id} deleted`)
        } else {
            const error = new Error(`house wih id ${req.params.id} not found`)
            error.httpStatusCode = 404
            next(error)
        }

    } catch (error) {
        console.log(error)
        next(error)
    }
})

// edit house info
houseRouter.put("/:id", auth, async(req,res,next)=>{
    try {
        const house = await houseModel.findByIdAndUpdate(req.params.id, req.body)
        delete req.user._id
        if(house){
            res.status(200).send(house)
        }else{
            const error = new Error(`house with id ${req.params.id} not found`)
            error.httpStatusCode= 404
            next(error)
        }
        
    } catch (error) {
        next(error)
    }
   
})





module.exports = houseRouter