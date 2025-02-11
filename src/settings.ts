import "dotenv/config";

export const dbConnectionString = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST || "localhost"}:${process.env.POSTGRES_PORT || 5432}/${process.env.POSTGRES_DB}`;

export const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
  credentials: true,
};

export const currentEnvVars = [
  "POSTGRES_DB",
  "POSTGRES_PASSWORD",
  "POSTGRES_USER",
  "PORT",
  "FRONTEND_URL",
  "JWT_SECRET",
  "REDIS_PASSWORD",
];

export const currentCategories = [
  "Status",
  "Functional",
  "Bug",
  "UI",
  "New",
  "Performance",
  "Default",
];

export const currentStatuses = [
  "Idea",
  "Planned",
  "In work",
  "Completed",
  "Started",
];

export const allowedUpdatePostFields = [
  "title",
  "description",
  "category",
  "status",
];
