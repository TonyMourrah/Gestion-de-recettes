const mongoose = require('mongoose');
const mealPlanSchema = require('../models/mealPlan');


// GET tous les mealPlans
const getAllMealPlans = async (req, res) => {
    try {
        const mealPlans = await mealPlanSchema.find();
        res.status(200).json({ mealPlans });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// GET un mealPlan
const getMealPlanById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "ID mealPlan invalide" });
    }

    const mealPlan = await mealPlanSchema.findById(id);

    if (!mealPlan) {
        return res.status(404).json({ error: "MealPlan non trouvé" });
    } else {
        res.status(200).json({ mealPlan });
    }
};

// POST un mealPlan
const createMealPlan = async (req, res) => {
    const { title, description, days} = req.body;

    try {
        const createdBy = req.user._id;
        const mealPlan = await mealPlanSchema.create({
            title,
            description,
            days,
            createdBy,
        });
        res.status(201).json({ mealPlan });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Supprimer un mealPlan
const deleteMealPlanById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "ID invalide" });
    }

    const mealPlan = await mealPlanSchema.findByIdAndDelete(id);

    if (!mealPlan) {
        return res.status(400).json({ error: "MealPlan non-trouvé" });
    } else {
        res.status(200).json(mealPlan);
    }
};

// Modifier un mealPlan
const updateMealPlanById = [

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID invalide" });
        }

        const mealPlan = await mealPlanSchema.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

        if (!mealPlan) {
            return res.status(400).json({ error: "MealPlan non-trouvé" });
        } else {
            res.status(200).json(mealPlan);
        }
    }
];

module.exports = { getAllMealPlans, getMealPlanById, createMealPlan, deleteMealPlanById, updateMealPlanById };