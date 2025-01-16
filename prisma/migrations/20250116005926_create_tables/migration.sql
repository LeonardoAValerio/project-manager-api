-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ColaboratorProject" (
    "id_colaborator" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_project" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "hour_value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ColaboratorProject_pkey" PRIMARY KEY ("id_user","id_project")
);

-- CreateTable
CREATE TABLE "ActionProject" (
    "id_colaborator" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActionProject_pkey" PRIMARY KEY ("id_colaborator")
);

-- CreateIndex
CREATE UNIQUE INDEX "ColaboratorProject_id_colaborator_key" ON "ColaboratorProject"("id_colaborator");

-- AddForeignKey
ALTER TABLE "ColaboratorProject" ADD CONSTRAINT "ColaboratorProject_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ColaboratorProject" ADD CONSTRAINT "ColaboratorProject_id_project_fkey" FOREIGN KEY ("id_project") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionProject" ADD CONSTRAINT "ActionProject_id_colaborator_fkey" FOREIGN KEY ("id_colaborator") REFERENCES "ColaboratorProject"("id_colaborator") ON DELETE RESTRICT ON UPDATE CASCADE;
