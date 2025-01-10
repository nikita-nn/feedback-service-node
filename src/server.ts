import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";

const feedBackService = express();

feedBackService.use(helmet());
feedBackService.use(express.json());
feedBackService.use(compression());
feedBackService.use(cors());

feedBackService.listen(8080);
