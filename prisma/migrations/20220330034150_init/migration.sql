-- CreateTable
CREATE TABLE "Hull" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT,
    "description" TEXT,
    "pages" JSON,

    CONSTRAINT "Hull_pkey" PRIMARY KEY ("id")
);
