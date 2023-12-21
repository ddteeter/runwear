-- CreateEnum
CREATE TYPE "TempRuns" AS ENUM ('VERY_COLD', 'COLD', 'NORMAL', 'WARM', 'VERY');

-- CreateEnum
CREATE TYPE "WeatherDataSource" AS ENUM ('MANUALLY_ENTERED', 'APPLE_WEATHER_KIT');

-- CreateEnum
CREATE TYPE "WorkoutSource" AS ENUM ('STRAVA', 'GARMIN', 'APPLE_HEALTH');

-- CreateEnum
CREATE TYPE "BodyPart" AS ENUM ('HEAD', 'FACE', 'NECK', 'ARMS', 'HANDS', 'TORSO', 'LEGS', 'FOOT');

-- CreateEnum
CREATE TYPE "Layer" AS ENUM ('BASE', 'MID', 'OUTER');

-- CreateEnum
CREATE TYPE "QueueQualifier" AS ENUM ('STRAVA_WEBHOOK');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "at" TIMESTAMP(3) NOT NULL,
    "durationSeconds" INTEGER NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Outfit" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "activityId" TEXT NOT NULL,

    CONSTRAINT "Outfit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conditions" (
    "id" TEXT NOT NULL,
    "temperature" DECIMAL(65,30) NOT NULL,
    "perceivedTemperature" DECIMAL(65,30),
    "humidity" INTEGER,
    "windSpeed" INTEGER,
    "windDirection" TEXT,
    "precipitationType" TEXT,
    "precipitationIntensity" INTEGER,
    "outfitId" TEXT NOT NULL,
    "dataSource" "WeatherDataSource" NOT NULL,
    "dataSourceUrl" TEXT,

    CONSTRAINT "Conditions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LinkedWorkout" (
    "id" TEXT NOT NULL,
    "globalId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "source" "WorkoutSource" NOT NULL,
    "activityId" TEXT NOT NULL,

    CONSTRAINT "LinkedWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutfitArticle" (
    "id" TEXT NOT NULL,
    "outfitId" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "layer" "Layer",

    CONSTRAINT "OutfitArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER,
    "url" TEXT,
    "bodyPart" "BodyPart" NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Queue" (
    "id" TEXT NOT NULL,
    "timeInserted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payload" JSONB NOT NULL,
    "qualifier" "QueueQualifier" NOT NULL,

    CONSTRAINT "Queue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

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
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outfit" ADD CONSTRAINT "Outfit_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
