import express from "express";
import helmet from "helmet";
import compression from "compression"

const feedBackService = express()

feedBackService.use(helmet())
feedBackService.use(express.json())
feedBackService.use(compression())

feedBackService.listen(8080)