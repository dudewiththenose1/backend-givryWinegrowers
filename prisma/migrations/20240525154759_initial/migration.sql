/*
  Warnings:

  - You are about to drop the column `logo` on the `Equipe` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `Joueur` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Equipe" DROP COLUMN "logo";

-- AlterTable
ALTER TABLE "Joueur" DROP COLUMN "photo";
