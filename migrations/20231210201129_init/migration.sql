-- CreateEnum
CREATE TYPE "WeatherDataSource" AS ENUM ('MANUALLY_ENTERED', 'APPLE_WEATHER_KIT');

-- CreateEnum
CREATE TYPE "WorkoutSource" AS ENUM ('STRAVA', 'GARMIN', 'APPLE_HEALTH');

-- CreateEnum
CREATE TYPE "BodyPart" AS ENUM ('HEAD', 'FACE', 'NECK', 'ARMS', 'HANDS', 'TORSO', 'LEGS', 'FOOT');

-- CreateEnum
CREATE TYPE "Layer" AS ENUM ('BASE', 'MID', 'OUTER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "at" TIMESTAMP(3) NOT NULL,
    "durationSeconds" INTEGER NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Outfit" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "activityId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Outfit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conditions" (
    "id" SERIAL NOT NULL,
    "temperature" DECIMAL(65,30) NOT NULL,
    "perceivedTemperature" DECIMAL(65,30),
    "humidity" INTEGER,
    "windSpeed" INTEGER,
    "windDirection" TEXT,
    "precipitationType" TEXT,
    "precipitationIntensity" INTEGER,
    "outfitId" INTEGER NOT NULL,
    "dataSource" "WeatherDataSource" NOT NULL,
    "dataSourceUrl" TEXT,

    CONSTRAINT "Conditions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LinkedWorkout" (
    "id" SERIAL NOT NULL,
    "globalId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "source" "WorkoutSource" NOT NULL,
    "activityId" INTEGER NOT NULL,

    CONSTRAINT "LinkedWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutfitArticle" (
    "id" SERIAL NOT NULL,
    "outfitId" INTEGER NOT NULL,
    "articleId" INTEGER NOT NULL,
    "layer" "Layer",

    CONSTRAINT "OutfitArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "brandId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER,
    "url" TEXT,
    "bodyPart" "BodyPart" NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Outfit_activityId_key" ON "Outfit"("activityId");

-- CreateIndex
CREATE UNIQUE INDEX "Conditions_outfitId_key" ON "Conditions"("outfitId");

-- CreateIndex
CREATE UNIQUE INDEX "LinkedWorkout_globalId_key" ON "LinkedWorkout"("globalId");

-- CreateIndex
CREATE UNIQUE INDEX "LinkedWorkout_activityId_key" ON "LinkedWorkout"("activityId");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_name_key" ON "Brand"("name");

-- AddForeignKey
ALTER TABLE "Outfit" ADD CONSTRAINT "Outfit_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outfit" ADD CONSTRAINT "Outfit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conditions" ADD CONSTRAINT "Conditions_outfitId_fkey" FOREIGN KEY ("outfitId") REFERENCES "Outfit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkedWorkout" ADD CONSTRAINT "LinkedWorkout_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutfitArticle" ADD CONSTRAINT "OutfitArticle_outfitId_fkey" FOREIGN KEY ("outfitId") REFERENCES "Outfit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutfitArticle" ADD CONSTRAINT "OutfitArticle_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
