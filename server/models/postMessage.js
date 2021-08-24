import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    engine: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    fuel_consumption: {
        type: Number,
        required: true
    },
    fuel_type: {
        type: String,
        required: true
    },
    fuel_tank: {
        type: Number,
        required: true
    },    
    length: {
        type: Number,
        required: true
    },
    width: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    wheelbase: {
        type: Number,
        required: true
    },
    gears: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
        default: 'Anonymous'
    },
    price: {
        type: Number,
        required: true
    },
    selectedFile: String,
    likes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model('PostMessage', postSchema)

export default PostMessage