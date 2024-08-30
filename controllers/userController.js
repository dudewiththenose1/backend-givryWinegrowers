const { getUserByUsername, deleteUser, modifyUser } = require('../models/userModel');


exports.read = async (req, res) => {
    try {
        const data = req.params.id;
        console.log("data", data);
        const userData = await getUserByUsername(data);
        res.json(userData);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const data = req.body;
        const userData = await deleteUser(data);
        res.json(userData);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.modify = async (req, res) => {
    try {
        const data = req.body;
        const userData = await modifyUser(data);
        res.json(userData);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};