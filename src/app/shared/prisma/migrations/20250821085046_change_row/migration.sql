-- AlterTable
ALTER TABLE "public"."orders" ALTER COLUMN "submissionTime" DROP DEFAULT,
ALTER COLUMN "submissionTime" SET DATA TYPE TEXT;
