const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const houseSchema = new Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    title: {
        type: String,
        required: [true, 'A house must have a title']
    },
    description: {
        type: String,
        required: [true, 'please describe your property']
    },

    price: {
        type: Number,
        required: [true, 'A property must have a price']
    },
    selfContained: {
        type: Boolean,
        required: [true, 'you must specify if the property has inner toilet and kitchen'],
        default: false
    },
    photo: {
        type: String,
        default: 'https://cdn.vox-cdn.com/thumbor/zVuv0s-NzoqRQef_zb91-X8sT88=/0x0:1800x1168/1200x800/filters:focal(733x429:1021x717)/cdn.vox-cdn.com/uploads/chorus_image/image/63048549/logan_apartments.6.jpg'
    },

    telephone: {
        type: String,

    },
    location: {
        type: String,
        required: [true, 'You must specify the location of your property']
    },
    address: {
        type: String
    },



},
    {
        timestamps: true,
    }
)

const houseModel = mongoose.model('house', houseSchema)

module.exports = houseModel