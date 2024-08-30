/*
  Warnings:

  - You are about to drop the `Blog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Commentaire` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ImageEquipe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ImageJoueur` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Participer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `imagejoueur` to the `Joueur` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Commentaire" DROP CONSTRAINT "Commentaire_id_auteur_fkey";

-- DropForeignKey
ALTER TABLE "Commentaire" DROP CONSTRAINT "Commentaire_id_blog_fkey";

-- DropForeignKey
ALTER TABLE "ImageEquipe" DROP CONSTRAINT "ImageEquipe_id_equipe_fkey";

-- DropForeignKey
ALTER TABLE "ImageJoueur" DROP CONSTRAINT "ImageJoueur_id_joueur_fkey";

-- DropForeignKey
ALTER TABLE "Participer" DROP CONSTRAINT "Participer_adversaire_id_fkey";

-- DropForeignKey
ALTER TABLE "Participer" DROP CONSTRAINT "Participer_event_id_fkey";

-- AlterTable
ALTER TABLE "Joueur" ADD COLUMN     "imagejoueur" TEXT NOT NULL;

-- DropTable
DROP TABLE "Blog";

-- DropTable
DROP TABLE "Commentaire";

-- DropTable
DROP TABLE "Event";

-- DropTable
DROP TABLE "ImageEquipe";

-- DropTable
DROP TABLE "ImageJoueur";

-- DropTable
DROP TABLE "Participer";
