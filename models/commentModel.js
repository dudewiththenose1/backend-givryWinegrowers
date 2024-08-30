/*require('dotenv').config();

const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();

async function createComment(data) {
    try {
        // Check if there's already a comment with the same nom and prenom
        const comment = await prisma.commentaire.create({
            data: {
                contenu: data.contenu,
                id_auteur: data.id_auteur,
                id_blog : data.id_blog
            },
        });
        return comment;
    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
}

async function getCommentById(data) {
    try {
        console.log('getComment:', data);
        let id = parseInt(data);
        const comment = await prisma.commentaire.findUnique({
            where: {
                id_comm: id
            }
        });
        return comment;
    } catch (error) {
        throw new Error(`Error getting user: ${error.message}`);
    }
}

async function getAllComments(data) {
    try {
        let IdUser = data;
        const comments = await prisma.commentaire.findMany({
            where: {
                id_auteur: IdUser
            }
        });
        return comments;
    } catch (error) {
        throw new Error(`Error retrieving comments: ${error.message}`);
    }
}

async function deleteComment(data) {
    try {
        //On verifie que l'utilisateur existe bien
        const already = await getCommentById(data);
        console.log('already:', already);
        if (already != null) {
            console.log('data:', data);
            const deletedComment = await prisma.commentaire.delete({
                where: { id_comm: already.id_comm }
            });
            console.log('deletedComment:', deletedComment);
            return deletedComment;
        } else {
            throw new Error(`Error deleting user : l'utilisateur n'existe pas`);
        }
    } catch {
        throw new Error(`Error deleting user : ${error.message}`);
    }
}


module.exports = {
    createComment,
    deleteComment,
    getAllComments,
    getCommentById
};

*/