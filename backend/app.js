require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const userRoute = require('./routes/userRoute');
const recipeRoute = require('./routes/recipeRoute');
const mealPlanRoute = require('./routes/mealPlanRoute');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    console.log(req.body);
    next();
});

app.use('/api/users', userRoute);
app.use('/api/recipes', recipeRoute);
app.use('/api/meal-plans', mealPlanRoute);

// Connection à la base de données MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connecté à la base de données MongoDB');
        app.listen(process.env.PORT, () => {
            console.log(`Serveur est connecté au port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error(err);
    });