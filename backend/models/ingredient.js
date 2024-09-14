const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    quantity: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        enum: ['g', 'ml', null],
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = ingredientSchema;