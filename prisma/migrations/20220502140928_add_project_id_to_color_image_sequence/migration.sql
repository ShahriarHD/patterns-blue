/*
  Warnings:

  - Added the required column `projectId` to the `Color` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `Sequence` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Color" DROP CONSTRAINT "Color_uuid_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_uuid_fkey";

-- DropForeignKey
ALTER TABLE "Sequence" DROP CONSTRAINT "Sequence_uuid_fkey";

-- AlterTable
ALTER TABLE "Color" ADD COLUMN     "projectId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "projectId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Sequence" ADD COLUMN     "projectId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sequence" ADD CONSTRAINT "Sequence_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
