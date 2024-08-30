/*
  Warnings:

  - Added the required column `id_blog` to the `Commentaire` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Commentaire" ADD COLUMN     "id_blog" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Commentaire" ADD CONSTRAINT "Commentaire_id_blog_fkey" FOREIGN KEY ("id_blog") REFERENCES "Blog"("id_blog") ON DELETE RESTRICT ON UPDATE CASCADE;
