"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./route/routes");
const Swagger_1 = require("./config/Swagger");
const app = (0, express_1.default)();
const PORT = 3090;
app.use(express_1.default.json());
const apiRouter = express_1.default.Router();
(0, routes_1.RegisterRoutes)(apiRouter);
app.use('/library', apiRouter);
(0, routes_1.RegisterRoutes)(app);
(0, Swagger_1.setupSwagger)(app);
app.listen(PORT, () => console.log("API ONLINE na porta " + PORT));
