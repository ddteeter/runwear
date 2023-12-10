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
export const QueueQualifier = {
    STRAVA_WEBHOOK: "STRAVA_WEBHOOK"
} as const;
export type QueueQualifier = (typeof QueueQualifier)[keyof typeof QueueQualifier];
export type Activity = {
    id: string;
    name: string;
    at: Timestamp;
    durationSeconds: number;
    latitude: string;
    longitude: string;
};
export type Article = {
    id: string;
    brandId: string;
    name: string;
    year: number | null;
    url: string | null;
    bodyPart: BodyPart;
};
export type Brand = {
    id: string;
    name: string;
    url: string | null;
};
export type Conditions = {
    id: string;
    temperature: string;
    perceivedTemperature: string | null;
    humidity: number | null;
    windSpeed: number | null;
    windDirection: string | null;
    precipitationType: string | null;
    precipitationIntensity: number | null;
    outfitId: string;
    dataSource: WeatherDataSource;
    dataSourceUrl: string | null;
};
export type ConnectedService = {
    id: string;
    userId: string;
    subscriptionId: string;
    service: WorkoutSource;
};
export type LinkedWorkout = {
    id: string;
    globalId: string;
    url: string;
    source: WorkoutSource;
    activityId: string;
};
export type Outfit = {
    id: string;
    date: Timestamp;
    activityId: string;
};
export type OutfitArticle = {
    id: string;
    outfitId: string;
    articleId: string;
    layer: Layer | null;
};
export type Queue = {
    id: string;
    timeInserted: Generated<Timestamp>;
    payload: unknown;
    qualifier: QueueQualifier;
};
export type User = {
    id: string;
    email: string;
    name: string;
};
export type DB = {
    Activity: Activity;
    Article: Article;
    Brand: Brand;
    Conditions: Conditions;
    ConnectedService: ConnectedService;
    LinkedWorkout: LinkedWorkout;
    Outfit: Outfit;
    OutfitArticle: OutfitArticle;
    Queue: Queue;
    User: User;
};
