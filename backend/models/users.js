const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// Static signup method
userSchema.statics.signup = async function (username, email, password) {

    if  (!username || !email || !password) throw new Error('Tous les champs sont obligatoires');

    if (!validator.isEmail(email)) throw new Error('L\'email n\'est pas valide');
    
    const emailExists = await this.findOne({ email });
    const usernameExists = await this.findOne({ username });
    
    if (emailExists) {
        throw new Error('L\'email existe déjà');
    }
    
    if (usernameExists) {
        throw new Error('Le nom d\'utilisateur existe déjà');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ username, email, password: hash });

    return user;
}

// Static login method
userSchema.statics.login = async function (email, password) {

    if (!email || !password) throw new Error('Email et mot de passe sont obligatoires');

    const user = await this.findOne({ email });

    if (!user) throw new Error('Email ou mot de passe incorrect');

    const match = await bcrypt.compare(password, user.password);

    if (!match) throw new Error('Email ou mot de passe incorrect');

    return user;
}

module.exports = mongoose.model('User', userSchema);
