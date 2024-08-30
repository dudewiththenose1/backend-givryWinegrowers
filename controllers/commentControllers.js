/*const { getAllComments, deleteComment, modifyComment, createComment } = require('../models/commentModel');


exports.read = async (req, res) => {
    try {
        const commentId = req.params.id;
        const comment = await getCommentById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment non trouvé" });
        }
        return res.status(200).json(comment);
    } catch (error) {
        console.error("Erreur lors de la récupération du comment :", error);
        return res.status(500).json({ message: "Erreur serveur lors de la récupération du comment" });
    }
};

exports.readAll = async (req, res) => {
    try {
        const UserId = req.body.id_auteur;
        const commentData = await getAllComments(UserId);
        res.json(commentData);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const commentId = req.params.id;
        const userData = await deleteComment(commentId);
        res.json(userData);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.create = async (req, res) => {
    try {
        const data = req.body;
        const commentData = await createComment(data);
        res.json(commentData);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
*/