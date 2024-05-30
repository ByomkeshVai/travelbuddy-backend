/*
  Warnings:

  - You are about to drop the column `images` on the `Trip` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "images",
ADD COLUMN     "photos" TEXT[],
ALTER COLUMN "type" DROP NOT NULL;
