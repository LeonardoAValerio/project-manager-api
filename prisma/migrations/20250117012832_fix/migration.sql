/*
  Warnings:

  - Added the required column `hour_value` to the `Work` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Work" ADD COLUMN     "descrition" TEXT,
ADD COLUMN     "hour_value" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total_value" DOUBLE PRECISION;
