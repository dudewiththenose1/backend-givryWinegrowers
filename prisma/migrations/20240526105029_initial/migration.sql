-- CreateTable
CREATE TABLE "ImageEquipe" (
    "id_photo" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "id_equipe" INTEGER NOT NULL,

    CONSTRAINT "ImageEquipe_pkey" PRIMARY KEY ("id_photo")
);

-- CreateTable
CREATE TABLE "ImageJoueur" (
    "id_photo" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "id_joueur" INTEGER NOT NULL,

    CONSTRAINT "ImageJoueur_pkey" PRIMARY KEY ("id_photo")
);

-- AddForeignKey
ALTER TABLE "ImageEquipe" ADD CONSTRAINT "ImageEquipe_id_equipe_fkey" FOREIGN KEY ("id_equipe") REFERENCES "Equipe"("id_equipe") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageJoueur" ADD CONSTRAINT "ImageJoueur_id_joueur_fkey" FOREIGN KEY ("id_joueur") REFERENCES "Joueur"("id_joueur") ON DELETE RESTRICT ON UPDATE CASCADE;
