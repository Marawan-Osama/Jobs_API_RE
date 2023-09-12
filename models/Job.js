const mongoose = require('mongoose')


const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    status:{
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending',
    },
    createdBy:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user']
    },
    },
    {timestamps: true}
    )

module.exports = mongoose.model('Job', JobSchema)