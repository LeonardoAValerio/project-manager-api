/*
  Warnings:

  - You are about to drop the `ActionProject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ActionProject" DROP CONSTRAINT "ActionProject_id_colaborator_fkey";

-- DropTable
DROP TABLE "ActionProject";

-- CreateTable
CREATE TABLE "Work" (
    "id" TEXT NOT NULL,
    "id_colaborator" TEXT NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_at" TIMESTAMP(3),

    CONSTRAINT "Work_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Work" ADD CONSTRAINT "Work_id_colaborator_fkey" FOREIGN KEY ("id_colaborator") REFERENCES "ColaboratorProject"("id_colaborator") ON DELETE RESTRICT ON UPDATE CASCADE;
