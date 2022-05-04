/*
  Warnings:

  - You are about to drop the column `projectId` on the `Color` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `layout` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `Sequence` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[blockId]` on the table `Color` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[blockId]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[blockId]` on the table `Sequence` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `blockId` to the `Color` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blockId` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blockId` to the `Sequence` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BlockSize" AS ENUM ('SM', 'MD', 'LG', 'COVER');

-- CreateEnum
CREATE TYPE "BlockAlignment" AS ENUM ('START', 'CENTER', 'END');

-- DropForeignKey
ALTER TABLE "Color" DROP CONSTRAINT "Color_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Sequence" DROP CONSTRAINT "Sequence_projectId_fkey";

-- AlterTable
ALTER TABLE "Color" DROP COLUMN "projectId",
ADD COLUMN     "blockId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "projectId",
ADD COLUMN     "blockId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "layout";

-- AlterTable
ALTER TABLE "Sequence" DROP COLUMN "projectId",
ADD COLUMN     "blockId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Text" (
    "uuid" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "blockId" TEXT NOT NULL,

    CONSTRAINT "Text_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Block" (
    "uuid" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "width" "BlockSize" NOT NULL,
    "height" "BlockSize" NOT NULL,
    "alignment" "BlockAlignment" NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Text_blockId_key" ON "Text"("blockId");

-- CreateIndex
CREATE UNIQUE INDEX "Color_blockId_key" ON "Color"("blockId");

-- CreateIndex
CREATE UNIQUE INDEX "Image_blockId_key" ON "Image"("blockId");

-- CreateIndex
CREATE UNIQUE INDEX "Sequence_blockId_key" ON "Sequence"("blockId");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "Block"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sequence" ADD CONSTRAINT "Sequence_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "Block"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Text" ADD CONSTRAINT "Text_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "Block"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "Block"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
