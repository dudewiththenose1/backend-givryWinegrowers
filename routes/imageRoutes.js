require('dotenv').config();

const express = require('express');
const router = express.Router();
const { createReadStream, rename } = require('fs');
const multer = require('multer');
const path = require('path');

const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();


const upload = multer({ dest: 'public/images' });

const renameFileWithExtension = (oldPath, newPath, callback) => {
    rename(oldPath, newPath, callback);
};

router.post('/upload/joueur', upload.single('file'), async (req, res) => {
    try {
        if (!req.file || !req.body.id) {
            throw new Error('Missing file or player ID');
        }
        const oldImageName = req.file.filename;
        const id = parseInt(req.body.id, 10);
        const newImageName = `${oldImageName}.png`;
        const oldImagePath = path.join('public/images', oldImageName);
        const newImagePath = path.join('public/images', newImageName);

        // Ensure the player (Joueur) with the given ID exists
        const joueur = await prisma.joueur.findUnique({
            where: {
                id_joueur: id
            }
        });

        if (!joueur) {
            throw new Error(`Player with ID ${id} does not exist`);
        }
        // Rename the file to add .png extension
        renameFileWithExtension(oldImagePath, newImagePath, async (err) => {
            if (err) {
                throw err;
            }
            // Create the image record in the database
            const image = await prisma.imageJoueur.create({
                data: {
                    nom: newImageName,
                    id_joueur: id
                }
            });

            console.log('Image record created:', image);
            return res.json(image);
        });

    } catch (error) {
        console.error('Error during upload:', error.message);
        console.error('Stack trace:', error.stack);
        res.status(500).json({ message: error.message, error: error.stack });
    }
});

// Route for accessing files
router.get('/joueur/:id', async (req, res) => {
    try {
        const imageid = req.params.id;
        let idJoueur = parseInt(imageid)
        const image = await prisma.imageJoueur.findMany({
            where: {
                id_joueur: idJoueur
            }
        });
        console.log("image", image)
        return res.json(image[0]);
        if (image.length === 0) {
            return res.status(404).json({ message: 'Images not found for this player' });
        }
        console.log("path", image[0].nom)
        return res.json(image[0]);
        /*const filePath = path.join(__dirname, 'images', image[0].nom);
        const readStream = createReadStream(filePath);

        readStream.on('error', (err) => {
            res.status(404).json({ message: 'File not found' });
        });

        readStream.pipe(res);*/
    } catch (error) {
        console.error('Error during upload:', error.message);
        console.error('Stack trace:', error.stack);
        res.status(500).json({ message: error.message, error: error.stack });
    }
});

/*router.get('/getImage', (req, res) => {
    
})*/


module.exports = router;