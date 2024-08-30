require('dotenv').config();

const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();

async function createEquipe(data) {
    try {
        // Check if there's already a player with the same nom and prenom
        const equipe = await prisma.equipe.create({
            data: {
                nom: data.nom
            },
        });
        return equipe;
    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
}

async function getAllEquipe() {
    try {
        const equipe = await prisma.equipe.findMany();
        return equipe;
    } catch (error) {
        throw new Error(`Error retrieving players: ${error.message}`);
    }
}

async function getEquipeById(data) {
    try {
        console.log('getEquipe:', data);
        let id = parseInt(data);
        console.log("id:",id)
        const equipe = await prisma.equipe.findUnique({
            where: {
                id_equipe: id // Spécifiez la valeur de l'ID de l'équipe
            }
        });
        return equipe;
    } catch (error) {
        throw new Error(`Erreur serveur lors de la récupération du equipe: ${error.message}`);
    }
}


async function deleteEquipe(data) {
    try {
        //On verifie que l'utilisateur existe bien
        const already = await getEquipeById(data);
        console.log('already:', already);
        if (already != null) {
            console.log('data:', data);
            const deletedEquipe = await prisma.equipe.delete({
                where: { id_equipe: already.id_equipe }
            });
            console.log('deletedJoueur:', deletedEquipe);
            return deletedEquipe;
        } else {
            throw new Error(`Error deleting user : l'utilisateur n'existe pas`);
        }
    } catch {
        throw new Error(`Error deleting user : ${error.message}`);
    }
}


async function modifyEquipe(data) {
    try {
        //On check si l'utilisateur existe bien
        const already = await getEquipeById(data.id_equipe);
        console.log('equipe:', already);
        if (already != null) {
            const updatedEquipe = await prisma.equipe.update({
                where: { id_equipe: already.id_equipe },
                data: {
                    nom: data.nom
                }
            });
            console.log('Nouveau:', updatedEquipe);
            return updatedEquipe;
        } else {
            throw new Error(`Error updating user : l'utilisateur n'existe pas `);
        }


    }
    catch (error) {
        throw new Error(`Error updating user : ${error.message}`);
    }
}

module.exports = {
    getEquipeById, deleteEquipe, modifyEquipe, createEquipe, getAllEquipe
};
