import cors from "cors"
import swaggerUi from "swagger-ui-express"
import express, { Express,  } from "express"
import { logger } from "./utils/config/logger.config";
import { router as routerAuth } from "./module/auth/router";
import { router as routerUsers} from "./module/user/router";
import { swaggerUiApp } from "./utils/config/swagger.config";
import {  rateLimit } from "./utils/config/rate-limiter.config";

const app: Express = express()

app.use(cors( ))
app.use(express.json({ strict: false,limit:"10kb" }));
app.use(logger);
app.use(rateLimit);

////  Swagger for API docs
app.use("/docs", swaggerUi.serve, swaggerUiApp);

// Routers
app.use("/api/v1/users", routerUsers);
app.use("/api/v1/auth", routerAuth);

app.get("/", (req, res) => {
    res.send({ message: "🟩 Server is up and running" })
})

export default app  