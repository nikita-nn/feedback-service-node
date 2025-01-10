import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import express, { Application } from "express";
import { corsOptions } from "../../settings";

export const initMiddlewares = (service: Application) => {
  service.use(helmet());
  service.use(express.json());
  service.use(compression());
  service.use(cors(corsOptions));
};
