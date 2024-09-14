import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.js";

// Pages et Components
import Login from "./Login/Login.jsx";
import RecipeListPage from "../RecipeListPage/RecipeListPage.jsx";
import NavBar from "./NavBar/NavBar.jsx";
import SignUp from "./SignUp/SignUp.jsx";
import Home from "./Home/Home.jsx";
import Profil from "./Profil/Profil.jsx";
import RecipeDetailPage from "../RecipeDetailPage/RecipeDetailPage.jsx";
import MyRecipeList from "../Pages/MyRecipeList.jsx";
import MyMealPlanList from "../Pages/MyMealPlanList.jsx";
import RecipeFormPage from "../Formulaires/RecipeFormPage/RecipeFormPage.jsx";
import MealPlanAddForm from "../Formulaires/MealPlanAddForm/MealPlanAddForm.jsx";
import MealPlanDetailPage from "../Pages/MealPlanDetailPage.jsx";

function App() {
  const { user } = useAuthContext();

  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route path="/RecipeListPage" element={<RecipeListPage />} />
          <Route
            path="/signup"
            element={!user ? <SignUp /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={user ? <Profil /> : <Navigate to="/" />}
          />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          <Route
            path="/myRecipes"
            element={user ? <MyRecipeList /> : <Navigate to="/" />}
          />
          <Route
            path="/myMealPlans"
            element={user ? <MyMealPlanList /> : <Navigate to="/" />}
          />
          <Route path="/meal-plan/:id" element={<MealPlanDetailPage />} />
          <Route path="/addMealPlan" element={<MealPlanAddForm />} />
          <Route path="/RecipeFormPage" element={<RecipeFormPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
