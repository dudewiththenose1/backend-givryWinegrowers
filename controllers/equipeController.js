const { getEquipeById, deleteEquipe, modifyEquipe, createEquipe, getAllEquipe } = require('../models/equipeModel');


exports.read = async (req, res) => {
    try {
        const equipeId = req.params.id;
        console.log("equipeId:", equipeId);
        const equipe = await getEquipeById(equipeId);
        if (!equipe) {
            return res.status(404).json({ message: "equipe non trouvé" });
        }
        return res.status(200).json(equipe);
    } catch (error) {
        console.error("Erreur lors de la récupération du equipe :", error);
        return res.status(500).json({ message: "Erreur serveur lors de la récupération du equipe" });
    }
};

exports.readAll = async (req, res) => {
    try {
        const equipeData = await getAllEquipe();
        res.json(equipeData);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const equipeId = req.params.id;
        const equipe = await deleteEquipe(equipeId);
        res.json(equipe);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.modify = async (req, res) => {
    try {
        const equipe = req.body;
        const equipeData = await modifyEquipe(equipe);
        res.json(equipeData);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const data = req.body;

        const equipeData = await createEquipe(data);
        res.json(equipeData);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};