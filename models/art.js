const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const artSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        description: {
            type: String,
            required: true,
            maxlength: 2000,
        },
        price: {
            type: Number,
            trim: true,
            required: true,
            maxlength: 32,
        },
        category: {
            type: ObjectId, // refers to art category
            ref: 'Category', // refers to category model
            required: true,
        },
        quantity: {
            type: Number,
        },
        sold: {
            type: Number,
            default: 0
        },
        photo: {
            data: Buffer,
            contentType: String,
        },
        shipping: {
            required: false,
            type: Boolean,
        }
    },
    { timestamps: true }
);

// virtual field


module.exports = mongoose.model("Art", artSchema)