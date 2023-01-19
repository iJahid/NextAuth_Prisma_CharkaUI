/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "empid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "father" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "relegion" INTEGER NOT NULL DEFAULT 0,
    "address" TEXT,
    "prmaddress" TEXT,
    "bloodgrp" TEXT,
    "lasteducation" TEXT,
    "joiningdate" TIMESTAMP(3),
    "dateofregular" TIMESTAMP(3),

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_empid_key" ON "Employee"("empid");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_username_fkey" FOREIGN KEY ("username") REFERENCES "Employee"("empid") ON DELETE RESTRICT ON UPDATE CASCADE;
