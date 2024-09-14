const { mongoose } = require("mongoose");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const validator = require("validator");


const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// Connexion d'un utilisateur
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // Créer un token
    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Creer un nouvel utilisateur
const signupUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.signup(username, email, password);

    // Créer un token
    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET un utilisateur
const getUserById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID utilisateur invalide" });
  }

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ error: "Utilisateur non trouvé" });
  } else {
    res.status(200).json({ user });
  }
};

// Modifier un utilisateur
const updateUserById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID invalide" });
  }

  const { username, email } = req.body;

  // Vérifier si le username et l'email sont fournis
  if (!username || !email) {
    return res.status(400).json({ error: "L'email et le username sont obligatoires" });
  }

  // Vérifier si l'email est valide
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "L'email n'est pas valide" });
  }

  // Vérifier si le username ou l'email est déjà pris
  const userWithSameUsername = await User.findOne({ username });
  const userWithSameEmail = await User.findOne({ email });

  if (userWithSameUsername && userWithSameUsername._id.toString() !== id) {
    return res.status(400).json({ error: "Le username est déjà pris" });
  }

  if (userWithSameEmail && userWithSameEmail._id.toString() !== id) {
    return res.status(400).json({ error: "L'email est déjà pris" });
  }

  const user = await User.findOneAndUpdate({ _id: id}, {...req.body}, { new: true })

  if (!user) {
    return res.status(400).json({ error: "Utilisateur non-trouvé" });
  } else {
    res.status(200).json(user);
  }
};

module.exports = { signupUser, loginUser, getUserById, updateUserById};
