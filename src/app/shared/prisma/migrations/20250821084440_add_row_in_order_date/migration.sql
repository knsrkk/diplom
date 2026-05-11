/*
  Warnings:

  - Added the required column `applicationDate` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."orders" ADD COLUMN     "applicationDate" TIMESTAMP(3) NOT NULL;
