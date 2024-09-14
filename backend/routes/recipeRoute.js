const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const { getAllRecipes, getRecipeById, createRecipe, updateRecipeById, deleteRecipeById } = require('../controllers/recipeController');

const router = express.Router();

router.get('/', getAllRecipes);

router.get('/:id', getRecipeById);

router.post('/', requireAuth, createRecipe);

router.patch('/:id', requireAuth, updateRecipeById);

router.delete('/:id', requireAuth, deleteRecipeById);

module.exports = router;