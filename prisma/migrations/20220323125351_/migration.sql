/*
  Warnings:

  - You are about to drop the `hull` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "hull";

-- CreateTable
CREATE TABLE "Hull" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT,
    "description" TEXT,
    "pages" JSON,

    CONSTRAINT "Hull_pkey" PRIMARY KEY ("id")
);
