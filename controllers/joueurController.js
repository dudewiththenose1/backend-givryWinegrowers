const { getAllJoueurs, getJoueurById, deleteJoueur, modifyJoueur,createJoueur } = require('../models/joueurModel');


exports.read = async (req, res) => {
    try {
        const playerId = req.params.id;
        const player = await getJoueurById(playerId);
        if (!player) {
            return res.status(404).json({ message: "Joueur non trouvé" });
        }
        return res.status(200).json(player);
    } catch (error) {
        console.error("Erreur lors de la récupération du joueur :", error);
        return res.status(500).json({ message: "Erreur serveur lors de la récupération du joueur" });
    }
};

exports.readAll = async (req, res) => {
    try {
        const joueurData = await getAllJoueurs();
        res.json(joueurData);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const playerId = req.params.id;
        const userData = await deleteJoueur(playerId);
        res.json(userData);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.modify = async (req, res) => {
    try {
        const joueur = req.body;
        const userData = await modifyJoueur(joueur);
        res.json(userData);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const data = req.body;
        const joueurData = await createJoueur(data);
        res.json(joueurData);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};