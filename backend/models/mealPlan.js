const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mealPlanSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    days: [{
        day: {
            type: String,
            enum: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
            required: true
        },
        meals: [{
            time: {
                type: String,
                enum: ['Déjeuner', 'Diner', 'Souper'],
                required: true
            },
            recipe: {
                type: Schema.Types.ObjectId,
                ref: 'Recipe',
                required: true
            }
        }]
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
} , { timestamps: true });

module.exports = mongoose.model('MealPlan', mealPlanSchema);