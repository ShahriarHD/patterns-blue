/*
  Warnings:

  - You are about to drop the column `alignment` on the `Block` table. All the data in the column will be lost.
  - You are about to drop the `Hull` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `email` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slug` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "BlockSize" ADD VALUE 'AUTO';

-- AlterTable
ALTER TABLE "Block" DROP COLUMN "alignment";

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "coverImage" TEXT NOT NULL DEFAULT E'',
ALTER COLUMN "slug" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- DropTable
DROP TABLE "Hull";

-- DropEnum
DROP TYPE "BlockAlignment";
