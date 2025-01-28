-- CreateTable
CREATE TABLE "Invitation" (
    "id" TEXT NOT NULL,
    "id_user_invite" TEXT NOT NULL,
    "id_user_invited" TEXT NOT NULL,
    "id_project" TEXT NOT NULL,
    "expire_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);
