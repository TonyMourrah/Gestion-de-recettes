import React, { useState, useEffect } from "react";
import "./MealPlanAddForm.css";
import { useAuthContext } from "../../hooks/useAuthContext.js";
import { useNavigate } from "react-router-dom";

const MealPlanAddForm = ({ onSubmit }) => {
  const { user, token } = useAuthContext();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    days: [
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
      "Dimanche",
    ].map((day) => ({
      day,
      meals: [
        { time: "Déjeuner", recipe: "", recipes: [] },
        { time: "Diner", recipe: "", recipes: [] },
        { time: "Souper", recipe: "", recipes: [] },
      ],
    })),
  });

  useEffect(() => {
    fetchRecipes();
  }, []);
  const fetchRecipes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/recipes/");
      let data = await response.json();
  
      // Crée une copie de formData
      let formDataCopy = JSON.parse(JSON.stringify(formData));
  
      // Vérifie si data.recipes est un tableau
      if (Array.isArray(data.recipes)) {
        // Itère sur les recettes récupérées
        data.recipes.forEach(recipe => {
          // Itère sur les jours dans formDataCopy
          for (let day in formDataCopy.days) {
            // Itère sur les repas de chaque jour
            formDataCopy.days[day].meals.forEach(meal => {
              // Vérifie si la catégorie de la recette correspond à l'heure du repas
              if (recipe.category === meal.time) {
                // Si c'est le cas, ajoute la recette au repas
                meal.recipes.push(recipe);
              }
            });
          }
        });
  
        // Met à jour l'état de formData avec formDataCopy
        setFormData(formDataCopy);
      } else {
        console.error("Data.recipes n'est pas un tableau:", data.recipes);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des recettes:", error);
    } finally {
      setIsLoading(false);
    }
  };


  const handleMealChange = async (e, dayIndex, mealIndex) => {
    const { name, value } = e.target;
    const updatedDays = [...formData.days];
    updatedDays[dayIndex].meals[mealIndex][name] = value;
    if (name === "time") {
      const recipes = await fetchRecipes();
      updatedDays[dayIndex].meals[mealIndex].recipes = recipes;
    }
    setFormData({
      ...formData,
      days: updatedDays,
    });
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("formData:", formData);
    if (!formData.title || !formData.description || formData.days.some(day => day.meals.some(meal => !meal.recipe))) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    if (user) {
      setFormData({ ...formData, createdBy: user._id });
    }

   


    try {
      const response = await fetch("http://localhost:4000/api/meal-plans/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error)
      }

      navigate("/myMealPlans");
    } catch (error) {
      setError(error.message);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mealPlanAddForm">
      <h2>Créer un plan de repas</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        {formData.days.map((day, dayIndex) => (
          <div key={dayIndex}>
            <h3>{day.day}</h3>
            {day.meals.map((meal, mealIndex) => (
              <div key={mealIndex}>
                <h4>{meal.time}</h4>
                <div>
                  <label>Recette:</label>
                  <select
                    name="recipe"
                    value={meal.recipe}
                    onChange={(e) => handleMealChange(e, dayIndex, mealIndex)}
                  >
                    <option value="">Sélectionner</option>
                    {meal.recipes
                      .filter((recipe) => recipe.category === meal.time) 
                      .map((recipe) => (
                        <option key={recipe._id} value={recipe._id}>
                          {recipe.title}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        ))}
        <button type="submit">Créer le plan de repas</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default MealPlanAddForm;
