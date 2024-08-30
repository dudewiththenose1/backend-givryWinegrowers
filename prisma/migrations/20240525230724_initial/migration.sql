/*
  Warnings:

  - You are about to drop the column `id_auteur` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `photo_blog` on the `Blog` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_id_auteur_fkey";

-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "id_auteur",
DROP COLUMN "photo_blog";
