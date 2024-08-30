/*
  Warnings:

  - You are about to drop the column `imagejoueur` on the `Joueur` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Joueur" DROP COLUMN "imagejoueur";

-- CreateTable
CREATE TABLE "ImageJoueur" (
    "id_photo" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "id_joueur" INTEGER NOT NULL,

    CONSTRAINT "ImageJoueur_pkey" PRIMARY KEY ("id_photo")
);

-- AddForeignKey
ALTER TABLE "ImageJoueur" ADD CONSTRAINT "ImageJoueur_id_joueur_fkey" FOREIGN KEY ("id_joueur") REFERENCES "Joueur"("id_joueur") ON DELETE RESTRICT ON UPDATE CASCADE;
