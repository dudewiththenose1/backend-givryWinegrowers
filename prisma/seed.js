const { PrismaClient } = require('@prisma/client');

const { hashPassword } = require('../models/userModel');

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.user.create({
      data: {
        pseudo: 'admin',
      password: await hashPassword('samoubelledu71'),
      },
    });
    
    console.log('Multiple rows created successfully');
  } catch (error) {
    console.log(`Error creating rows: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
}

main();
