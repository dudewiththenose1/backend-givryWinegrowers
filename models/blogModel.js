/*require('dotenv').config();

const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();

async function createBlog(data) {
    try {
        // Check if there's already a player with the same nom and prenom
        const blog = await prisma.blog.create({
            data: {
                titre: data.titre,
                contenu: data.contenu
            },
        });
        return blog;
    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
}

async function getAllBlog() {
    try {
        const blog = await prisma.blog.findMany();
        return blog;
    } catch (error) {
        throw new Error(`Error retrieving players: ${error.message}`);
    }
}

async function getBlogById(data) {
    try {
        console.log('getBlog:', data);
        let id = parseInt(data);
        console.log("id:", id)
        const blog = await prisma.blog.findUnique({
            where: {
                id_blog: id // Spécifiez la valeur de l'ID de l'équipe
            }
        });
        return blog;
    } catch (error) {
        throw new Error(`Erreur serveur lors de la récupération du blog: ${error.message}`);
    }
}


async function deleteBlog(data) {
    try {
        //On verifie que l'utilisateur existe bien
        const already = await getBlogById(data);
        console.log('already:', already);
        if (already != null) {
            console.log('data:', data);
            const deletedBlog = await prisma.blog.delete({
                where: { id_blog: already.id_blog }
            });
            console.log('deletedBlog:', deletedBlog);
            return deletedBlog;
        } else {
            throw new Error(`Error deleting user : l'utilisateur n'existe pas`);
        }
    } catch {
        throw new Error(`Error deleting user : ${error.message}`);
    }
}


async function modifyBlog(data) {
    try {
        const already = await getBlogById(data.id_blog);
        console.log('joueur:', already);
        if (already != null) {
            const updatedBlog = await prisma.blog.update({
                where: { id_blog: already.id_blog },
                data: {
                    titre: data.titre,
                    contenu: data.contenu
                }
            });
            console.log('Nouveau:', updatedBlog);
            return updatedBlog;
        } else {
            throw new Error(`Error updating user : l'utilisateur n'existe pas `);
        }
    }
    catch (error) {
        throw new Error(`Error updating user : ${error.message}`);
    }
}

module.exports = {
    getBlogById, deleteBlog, modifyBlog, createBlog, getAllBlog
};
*/