/*
  Warnings:

  - Added the required column `cardCcv` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardExpiration` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardNumber` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardType` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerFullName` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'EUR', 'AUD', 'THB', 'HKD', 'SGD');

-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('AMEX', 'VISA');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "cardCcv" TEXT NOT NULL,
ADD COLUMN     "cardExpiration" TEXT NOT NULL,
ADD COLUMN     "cardNumber" TEXT NOT NULL,
ADD COLUMN     "cardType" "CardType" NOT NULL,
ADD COLUMN     "currency" "Currency" NOT NULL,
ADD COLUMN     "customerFullName" TEXT NOT NULL;
