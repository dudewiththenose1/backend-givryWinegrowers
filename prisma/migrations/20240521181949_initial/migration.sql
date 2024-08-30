-- CreateTable
CREATE TABLE "User" (
    "id_user" TEXT NOT NULL,
    "pseudo" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Commentaire" (
    "id_comm" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contenu" TEXT NOT NULL,
    "id_auteur" TEXT NOT NULL,

    CONSTRAINT "Commentaire_pkey" PRIMARY KEY ("id_comm")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id_blog" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "photoBlog" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "id_auteur" TEXT NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id_blog")
);

-- CreateTable
CREATE TABLE "Equipe" (
    "id_equipe" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "logo" TEXT NOT NULL,

    CONSTRAINT "Equipe_pkey" PRIMARY KEY ("id_equipe")
);

-- CreateTable
CREATE TABLE "Joueur" (
    "id_joueur" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "id_equipe" INTEGER NOT NULL,

    CONSTRAINT "Joueur_pkey" PRIMARY KEY ("id_joueur")
);

-- CreateTable
CREATE TABLE "Participer" (
    "id_participer" SERIAL NOT NULL,
    "adversaireId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "Participer_pkey" PRIMARY KEY ("id_participer")
);

-- CreateTable
CREATE TABLE "Event" (
    "id_event" SERIAL NOT NULL,
    "dateEvent" TIMESTAMP(3) NOT NULL,
    "typeEvent" TEXT NOT NULL,
    "adresseEvent" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id_event")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_pseudo_key" ON "User"("pseudo");

-- AddForeignKey
ALTER TABLE "Commentaire" ADD CONSTRAINT "Commentaire_id_auteur_fkey" FOREIGN KEY ("id_auteur") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_id_auteur_fkey" FOREIGN KEY ("id_auteur") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Joueur" ADD CONSTRAINT "Joueur_id_equipe_fkey" FOREIGN KEY ("id_equipe") REFERENCES "Equipe"("id_equipe") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participer" ADD CONSTRAINT "Participer_adversaireId_fkey" FOREIGN KEY ("adversaireId") REFERENCES "Equipe"("id_equipe") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participer" ADD CONSTRAINT "Participer_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id_event") ON DELETE RESTRICT ON UPDATE CASCADE;
