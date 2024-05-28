/*
  Warnings:

  - You are about to drop the column `activities` on the `Trip` table. All the data in the column will be lost.
  - Added the required column `type` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "activities",
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "budget" DROP NOT NULL;
