require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();


const secretKey = 'givrywinegrowers'; // Change this to your actual secret key

// Function to create JWT
async function createJwt(username) {
    try {
        return jwt.sign({ username }, secretKey, { expiresIn: '1h' }); // Expires in 1 hour
    } catch (error) {
        console.log(`Error creating Jwt : ${error.message}`)
    }
    
}


//Création de mot de passe crypte
async function hashPassword(password, saltRounds = 10) {
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(saltRounds)

        // Hash password
        return await bcrypt.hash(password, salt)
    } catch (error) {
        console.log(error)
    }

    // Return null if error
    return null
}

async function createUser(data) {
    try {
        const databaseUrl = process.env.DATABASE_URL;
        if (!databaseUrl) {
            console.log("Environment variable DATABASE_URL is not set");
           
        }
        //On check s'il n'y pas deja une utilisateur du meme pseudo
        const already = await getUserByUsername(data.username);
        if (already == null) {
            const hashedPassword = await hashPassword(data.password);
        const user = await prisma.user.create({
            data: {
                id_user: uuidv4(),
                pseudo: data.username,
                password: hashedPassword
            },
        });
        return user;
        } else {
            throw new Error(`Error creating user : l'utilisateur existe déjà`);
        }

        
    }
    catch (error) { 
        throw new Error(`Error creating user : ${error.message}`);
    }
}

async function getUserByUsername(data) {
    try {
        
        // Recherchez l'utilisateur dans la base de données par son nom d'utilisateur
        console.log('getUSer:', data);
        const user = await prisma.user.findUnique({
            where: {
                pseudo: data
            }
        });
        
        
        return user; // Renvoie l'utilisateur trouvé ou null s'il n'existe pas
    }
    catch (error) {
        throw new Error(`Error getting user : ${error.message}`);
    }
}



//Comparer deux mot de passe 
const comparePassword = async (password, hash) => {
    try {
        // Compare password
        return await bcrypt.compare(password, hash)
    } catch (error) {
        console.log(error)
    }

    // Return false if error
    return false
}

async function comparePasswords(user,data) { //user est l'utilisateur de la db et data est l'utilisateur qui essaye de se log
    try {
        
        const test = await bcrypt.hash('test', 10);
        // Recherchez l'utilisateur dans la base de données par son nom d'utilisateur
        const isPasswordValid = await bcrypt.compare(data.password, test);
        console.log(`Password is ${!isPasswordValid ? 'not' : ''} valid!`)
        return isPasswordValid; // Renvoie true si c'est bon ou false
    }
    catch (error) {
        throw new Error(`Error comparing 2 password : ${error.message}`);
    }
}


async function deleteUser(data) {
    try {
        //On verifie que l'utilisateur existe bien
        const already = await getUserByUsername(data);
        console.log('already:', already);
        if (already != null) {
            console.log('data:',data);
            const deletedUser = await prisma.user.delete({
                where: { pseudo: data.username }
            });
            console.log('deleteUser:', deleteUser);
            return deletedUser;
        } else {
            throw new Error(`Error deleting user : l'utilisateur n'existe pas`);
        }
    } catch {
        throw new Error(`Error deleting user : ${error.message}`);
    }
}


async function modifyUser(data) {
    try {
        //On check si l'utilisateur existe bien
        const already = await getUserByUsername(data);
        console.log('user:', already);
        if (already != null) {
            const updatedUser = await prisma.user.update({
                where: { id_user : already.id_user },
                data: {
                    pseudo : data.newPseudo
                }
            });
            return updatedUser;
        } else {
            throw new Error(`Error updating user : l'utilisateur n'existe pas `);
        }


    }
    catch (error) {
        throw new Error(`Error updating user : ${error.message}`);
    }
}

module.exports = {
    createUser,
    getUserByUsername,
    comparePasswords,
    deleteUser,
    modifyUser,
    createJwt
};