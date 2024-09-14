const { mongoose } = require("mongoose");
const Recipe = require("../models/recipe");
const { check, validationResult } = require("express-validator");


// GET toutes les recettes
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json({ recipes });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET une recette
const getRecipeById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID recette invalide" });
  }

  const recipe = await Recipe.findById(id);
  if (!recipe) {
    return res.status(404).json({ error: "Recette non trouvée" });
  } else {
    res.status(200).json({ recipe });
  }
};

// POST une recette
const createRecipe = async (req, res) => {
  const { title, description, ingredients, steps, image, category} = req.body;

  const champsVides = [];

  // Vérifier si les champs requis sont vides
  Object.keys(req.body).forEach((field) => {
    if (!req.body[field]) {
      champsVides.push(field);
    }
  });

  if (champsVides.length > 0) {
    return res.status(400).json({
      error: `Les champs suivants sont vides: ${champsVides.join(", ")}`,
    });
  }
  try {
    const createdBy = req.user._id;
    const recipe = await Recipe.create({
      title,
      description,
      ingredients,
      steps,
      image,
      category,
      createdBy,
    });

    res.status(201).json({ recipe });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Supprimer une recette
const deleteRecipeById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID recette invalide" });
  }

  const recipe = await Recipe.findByIdAndDelete(id);
  if (!recipe) {
    return res.status(404).json({ error: "Recette non trouvée" });
  } else {
    res.status(200).json({ message: "Recette supprimée" });
  }
};

// Modifier une recette
const updateRecipeById = [
  check('title').notEmpty().withMessage('Le titre est requis'),
  check('description').notEmpty().withMessage('La description est requise'),
  check('ingredients').notEmpty().withMessage('Les ingrédients sont requis'),
  check('steps').notEmpty().withMessage('Les étapes sont requises'),
  check('image').notEmpty().withMessage('L\'image est requise'),
  check('category').custom((value) => {
    const allowedCategories = ['Déjeuner', 'Diner', 'Souper']; 
    if (!allowedCategories.includes(value)) {
      throw new Error('Catégorie invalide');
    }
    return true;
  }).withMessage('La catégorie est requise'),



  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID recette invalide" });
    }

    const recipe = await Recipe.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    if (!recipe) {
      return res.status(404).json({ error: "Recette non trouvée" });
    } else {
      res.status(200).json({ recipe });
    }
  }
];


module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  deleteRecipeById,
  updateRecipeById,
};