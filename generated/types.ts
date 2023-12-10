import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export const WeatherDataSource = {
    MANUALLY_ENTERED: "MANUALLY_ENTERED",
    APPLE_WEATHER_KIT: "APPLE_WEATHER_KIT"
} as const;
export type WeatherDataSource = (typeof WeatherDataSource)[keyof typeof WeatherDataSource];
export const WorkoutSource = {
    STRAVA: "STRAVA",
    GARMIN: "GARMIN",
    APPLE_HEALTH: "APPLE_HEALTH"
} as const;
export type WorkoutSource = (typeof WorkoutSource)[keyof typeof WorkoutSource];
export const BodyPart = {
    HEAD: "HEAD",
    FACE: "FACE",
    NECK: "NECK",
    ARMS: "ARMS",
    HANDS: "HANDS",
    TORSO: "TORSO",
    LEGS: "LEGS",
    FOOT: "FOOT"
} as const;
export type BodyPart = (typeof BodyPart)[keyof typeof BodyPart];
export const Layer = {
    BASE: "BASE",
    MID: "MID",
    OUTER: "OUTER"
} as const;
export type Layer = (typeof Layer)[keyof typeof Layer];
export type Activity = {
    id: Generated<number>;
    name: string;
    at: Timestamp;
    durationSeconds: number;
    latitude: string;
    longitude: string;
};
export type Article = {
    id: Generated<number>;
    brandId: number;
    name: string;
    year: number | null;
    url: string | null;
    bodyPart: BodyPart;
};
export type Brand = {
    id: Generated<number>;
    name: string;
    url: string | null;
};
export type Conditions = {
    id: Generated<number>;
    temperature: string;
    perceivedTemperature: string | null;
    humidity: number | null;
    windSpeed: number | null;
    windDirection: string | null;
    precipitationType: string | null;
    precipitationIntensity: number | null;
    outfitId: number;
    dataSource: WeatherDataSource;
    dataSourceUrl: string | null;
};
export type LinkedWorkout = {
    id: Generated<number>;
    globalId: string;
    url: string;
    source: WorkoutSource;
    activityId: number;
};
export type Outfit = {
    id: Generated<number>;
    date: Timestamp;
    activityId: number;
    userId: number;
};
export type OutfitArticle = {
    id: Generated<number>;
    outfitId: number;
    articleId: number;
    layer: Layer | null;
};
export type User = {
    id: Generated<number>;
    email: string;
    name: string;
};
export type DB = {
    Activity: Activity;
    Article: Article;
    Brand: Brand;
    Conditions: Conditions;
    LinkedWorkout: LinkedWorkout;
    Outfit: Outfit;
    OutfitArticle: OutfitArticle;
    User: User;
};
