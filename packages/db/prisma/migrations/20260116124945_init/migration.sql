-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreateRoom" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "roomId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CreateRoom_id_key" ON "CreateRoom"("id");

-- AddForeignKey
ALTER TABLE "CreateRoom" ADD CONSTRAINT "CreateRoom_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
