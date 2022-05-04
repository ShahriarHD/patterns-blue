-- CreateEnum
CREATE TYPE "ColorMetaStates" AS ENUM ('PROJECT_BACKGROUND_LIGHT', 'PROJECT_BACKGROUND_DARK', 'PROJECT_ACCENT_COLOR', 'JUST_A_BEAUTIFUL_COLOR');

-- CreateTable
CREATE TABLE "Image" (
    "uuid" TEXT NOT NULL,
    "url" TEXT,
    "caption" TEXT,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Sequence" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "steps" TEXT[],

    CONSTRAINT "Sequence_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Color" (
    "uuid" TEXT NOT NULL,
    "hex" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "meta" "ColorMetaStates" NOT NULL DEFAULT E'JUST_A_BEAUTIFUL_COLOR',

    CONSTRAINT "Color_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Project" (
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "slug" TEXT,
    "index" INTEGER NOT NULL,
    "isPublic" BOOLEAN NOT NULL,
    "layout" JSONB NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Profile" (
    "uuid" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_uuid_key" ON "Image"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Sequence_uuid_key" ON "Sequence"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Color_uuid_key" ON "Color"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Project_uuid_key" ON "Project"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_uuid_key" ON "Profile"("uuid");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_uuid_fkey" FOREIGN KEY ("uuid") REFERENCES "Project"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sequence" ADD CONSTRAINT "Sequence_uuid_fkey" FOREIGN KEY ("uuid") REFERENCES "Project"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_uuid_fkey" FOREIGN KEY ("uuid") REFERENCES "Project"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_uuid_fkey" FOREIGN KEY ("uuid") REFERENCES "Profile"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
