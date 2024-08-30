require('dotenv').config();

const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();

async function createJoueur(data) {
    try {
        // Check if there's already a player with the same nom and prenom
        const joueur = await prisma.joueur.create({
            data: {
                nom: data.nom,
                prenom: data.prenom,
                id_equipe: data.id_equipe
            },
        });
        return joueur;
    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
}


async function getJoueurByUsername(data) {
    try {
        console.log('getJoueur:', data);
        const joueur = await prisma.joueur.findUnique({
            where: {
                nom : data.nom
            }
        });
        return joueur;
    } catch (error) {
        throw new Error(`Error getting user: ${error.message}`);
    }
}

async function getJoueurById(data) {
    try {
        console.log('getJoueur:', data);
        let id = parseInt(data);
        const joueur = await prisma.joueur.findUnique({
            where: {
                id_joueur: id
            }
        });
        return joueur;
    } catch (error) {
        throw new Error(`Error getting user: ${error.message}`);
    }
}

async function getAllJoueurs() {
    try {
        const joueurs = await prisma.joueur.findMany();
        console.log(joueurs)
        return joueurs;
    } catch (error) {
        throw new Error(`Error retrieving players: ${error.message}`);
    }
}

async function deleteJoueur(data) {
    try {
        // On vérifie que l'utilisateur existe bien
        const already = await getJoueurById(data);
        console.log('already:', already);

        if (already) {
            // Suppression des images associées au joueur avant la suppression du joueur
            await prisma.imageJoueur.deleteMany({
                where: { id_joueur: already.id_joueur }
            });
            console.log('data:', already.id_joueur);
            const deletedJoueur = await prisma.joueur.delete({
                where: { id_joueur: already.id_joueur }
            });
            console.log('deletedJoueur:', deletedJoueur);
            return deletedJoueur;
        } else {
            throw new Error(`L'utilisateur n'existe pas`);
        }
    } catch (error) {
        console.error('Error deleting user:', error.message); // Affichage du message d'erreur
        throw new Error(`Error deleting user: ${error.message}`); // Rejeter l'erreur avec le message
    }
}



async function modifyJoueur(data) {
    try {
        //On check si l'utilisateur existe bien
        const already = await getJoueurById(data.id_joueur);
        console.log('joueur:', already);
        if (already != null) {
            const updatedJoueur = await prisma.joueur.update({
                where: { id_joueur: already.id_joueur },
                data: {
                    nom: data.nom,
                    prenom: data.prenom,
                    id_equipe: data.id_equipe
                }
            });
            console.log('Nouveau:', updatedJoueur);
            return updatedJoueur;
        } else {
            throw new Error(`Error updating user : l'utilisateur n'existe pas `);
        }


    }
    catch (error) {
        throw new Error(`Error updating user : ${error.message}`);
    }
}

module.exports = {
    createJoueur,
    getJoueurByUsername,
    deleteJoueur,
    modifyJoueur,
    getAllJoueurs,
    getJoueurById
};