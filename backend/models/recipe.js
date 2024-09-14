const mongoose = require('mongoose');
const ingredientSchema = require('./ingredient');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    ingredients: [ingredientSchema],
    steps: {
        type: [String],
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    // Categorie de la recette
    category: {
        type: String,
        required: true,
        enum: ['Déjeuner', 'Diner', 'Souper'],
    },
    // Champ pour stocker l'utilisateur qui a créé la recette
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);