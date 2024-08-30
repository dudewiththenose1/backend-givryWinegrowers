/*
  Warnings:

  - You are about to drop the column `photoBlog` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `adresseEvent` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `dateEvent` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `typeEvent` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `adversaireId` on the `Participer` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `Participer` table. All the data in the column will be lost.
  - Added the required column `photo_blog` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adresse_event` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_event` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_event` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adversaire_id` to the `Participer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_id` to the `Participer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Participer" DROP CONSTRAINT "Participer_adversaireId_fkey";

-- DropForeignKey
ALTER TABLE "Participer" DROP CONSTRAINT "Participer_eventId_fkey";

-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "photoBlog",
ADD COLUMN     "photo_blog" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "adresseEvent",
DROP COLUMN "dateEvent",
DROP COLUMN "typeEvent",
ADD COLUMN     "adresse_event" TEXT NOT NULL,
ADD COLUMN     "date_event" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "type_event" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Participer" DROP COLUMN "adversaireId",
DROP COLUMN "eventId",
ADD COLUMN     "adversaire_id" INTEGER NOT NULL,
ADD COLUMN     "event_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Participer" ADD CONSTRAINT "Participer_adversaire_id_fkey" FOREIGN KEY ("adversaire_id") REFERENCES "Equipe"("id_equipe") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participer" ADD CONSTRAINT "Participer_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id_event") ON DELETE RESTRICT ON UPDATE CASCADE;
