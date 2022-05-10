/*
  Warnings:

  - You are about to drop the column `meta` on the `Color` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Color" DROP COLUMN "meta";

-- DropEnum
DROP TYPE "ColorMetaStates";
