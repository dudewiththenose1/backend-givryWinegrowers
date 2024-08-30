const jwt = require('jsonwebtoken');

const { createUser, getUserByUsername, comparePasswords, createJwt } = require('../models/userModel');


exports.register = async (req, res) => {
    try {
        const data = req.body;
        console.log('log:', data);
        const userData = await createUser(data);
        res.json(userData);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const data = req.body;
        const user = await getUserByUsername(data.username);
        console.log('user:', user);
        
        if (!user) {
            // Si l'utilisateur n'est pas trouvé, renvoyer une réponse d'erreur
            return res.status(401).json({ message: "Nom d'utilisateur introuvable" });
        }

        const isPasswordValid = await comparePasswords(user,data);

        if (!isPasswordValid) {
            // Si le mot de passe n'est pas valide, renvoyer une réponse d'erreur
            return res.status(401).json({ message: "mot de passe incorrect." });
        }   
        const JWTtoken = await createJwt(data.username);
        // Set HttpOnly cookie with the JWT
        res.cookie('jwtToken', JWTtoken, {
            httpOnly: true, // Cookie is accessible only by the server
            maxAge: 3600000, // Expiry in milliseconds (1 hour)
            secure: false // Set to true if using HTTPS
        });
        let admin = false;
        if (user.pseudo == "dieu") {
            admin = true;
        }
        console.log("token:", JWTtoken);
        res.status(200).json({ token: JWTtoken, admin : admin});
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.logout = async (req, res) => {
    try {
        const token = req.cookies.jwtToken;
        if (token) {
            // Supprimez le cookie côté serveur
            res.clearCookie('jwtToken', {
                httpOnly: true,
                secure: false // Assurez-vous de mettre à true si vous utilisez HTTPS
            });
            res.status(200).json({ message: 'Logout successful' });
        } else {
            console.error('Failed to clear cookie');
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};