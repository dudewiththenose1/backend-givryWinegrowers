/*const { getBlogById, deleteBlog, modifyBlog, createBlog, getAllBlog } = require('../models/blogModel');


exports.read = async (req, res) => {
    try {
        const blogId = req.params.id; // Convertir l'ID en nombre
        const blog = await getBlogById(blogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog non trouvé" });
        }
        return res.status(200).json(blog);
    } catch (error) {
        console.error("Erreur lors de la récupération du blog :", error);
        return res.status(500).json({ message: "Erreur serveur lors de la récupération du blog" });
    }
};


exports.readAll = async (req, res) => {
    try {
        const blogData = await getAllBlog();
        res.json(blogData);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await deleteBlog(blogId);
        res.json(blog);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.modify = async (req, res) => {
    try {
        const data = req.body;
        const blogData = await modifyBlog(data);
        res.json(blogData);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        const blogData = await createBlog(data);
        res.json(blogData);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
*/