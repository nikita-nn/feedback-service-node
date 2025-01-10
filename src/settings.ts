export const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
  credentials: true,
};

export const currentEnvVars = [
  "POSTGRES_DB",
  "POSTGRES_PASSWORD",
  "POSTGRES_USER",
  "DATABASE_URL",
  "PORT",
  "FRONTEND_URL",
];
