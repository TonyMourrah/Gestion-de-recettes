import React, { useState } from "react";
import "../RecipeFormPage/RecipeFormPage.css";
import { useAuthContext } from "../../hooks/useAuthContext.js";
import { useNavigate } from "react-router-dom";

function RecipeFormPage({ onSubmit }) {
  const { user, token } = useAuthContext();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: [{ quantity: 1, unit: "", name: "" }],
    steps: [""],
    image: "",
    category: "",
    createdBy: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleIngredientChange = (index, event) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = {
      ...newIngredients[index],
      [event.target.name]: event.target.value,
    };
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const handleStepChange = (index, event) => {
    const newSteps = [...formData.steps];
    newSteps[index] = event.target.value;
    setFormData({ ...formData, steps: newSteps });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const hasEmptyIngredients = formData.ingredients.some(
      (ingredient) =>
        !ingredient.quantity || !ingredient.unit || !ingredient.name
    );
    const hasEmptySteps = formData.steps.some((step) => !step);

    if (hasEmptyIngredients || hasEmptySteps) {
      setError(
        "Veuillez remplir tous les informations pour pouvoir créer votre recette."
      );
      return;
    }
    let updatedFormData = formData;
    if (user) {
      updatedFormData = { ...formData, createdBy: user._id };
    }

    try {
      const response = await fetch("http://localhost:4000/api/recipes/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });
      console.log(response);

      if (!response.ok) {
        throw new Error("Une erreur est survenue, veuillez réessayer.");
      }

      navigate("/RecipeListPage");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRemoveLastIngredient = () => {
    const newIngredients = [...formData.ingredients];
    newIngredients.pop();
    setFormData({ ...formData, ingredients: newIngredients });
  };
  const handleRemoveLastStep = () => {
    const newSteps = [...formData.steps];
    newSteps.pop();
    setFormData({ ...formData, steps: newSteps });
  };

  return (
    <div>
      <form className="recipeFormPage" onSubmit={handleSubmit}>
        <label>
          Titre de votre recette :
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </label>
        Ingrédients:
        {formData.ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-inputs">
            <input
              type="number"
              min="1"
              name="quantity"
              value={ingredient.quantity}
              onChange={(event) => handleIngredientChange(index, event)}
              className="ingredient-quantity"
            />
            <select
              name="unit"
              value={ingredient.unit}
              onChange={(event) => handleIngredientChange(index, event)}
              className="ingredient-unit"
            >
              <option value="">Unité</option>
              <option value="g">g</option>
              <option value="ml">ml</option>
            </select>
            <input
              type="text"
              name="name"
              value={ingredient.name}
              onChange={(event) => handleIngredientChange(index, event)}
              className="ingredient-name"
            />
          </div>
        ))}
        <button
          type="button"
          className="Deuxiemebutton"
          onClick={() =>
            setFormData({
              ...formData,
              ingredients: [
                ...formData.ingredients,
                { quantity: 1, unit: "", name: "" },
              ],
            })
          }
        >
          Ajouter un autre ingredient
        </button>
        <button type="button" onClick={handleRemoveLastIngredient}>
          Retirer le dernier ingredient
        </button>
        <label> Étapes: </label>
        {formData.steps.map((step, index) => (
          <input
            key={index}
            type="text"
            name={`step-${index}`}
            value={step}
            onChange={(event) => handleStepChange(index, event)}
          />
        ))}
        <button
          type="button"
          className="Deuxiemebutton"
          onClick={() =>
            setFormData({ ...formData, steps: [...formData.steps, ""] })
          }
        >
          Ajouter une autre étape
        </button>
        <button type="button" className="rouge" onClick={handleRemoveLastStep}>
          Retirer la dernière étape
        </button>
        <label>
          Le lien de votre image :
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Categorie:
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value=""> Choisisez une Categorie </option>
            <option value="Déjeuner">Déjeuner</option>
            <option value="Diner">Diner</option>
            <option value="Souper">Souper</option>
          </select>
        </label>
        <button type="submit">Ajouter</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default RecipeFormPage;
