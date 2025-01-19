/*
  Warnings:

  - Changed the type of `role` on the `ColaboratorProject` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ColaboratorRoles" AS ENUM ('MASTER', 'ADMIN', 'USER');

-- AlterTable
ALTER TABLE "ColaboratorProject" DROP COLUMN "role",
ADD COLUMN     "role" "ColaboratorRoles" NOT NULL;
