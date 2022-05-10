/*
  Warnings:

  - You are about to drop the `Sequence` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sequence" DROP CONSTRAINT "Sequence_blockId_fkey";

-- DropTable
DROP TABLE "Sequence";
