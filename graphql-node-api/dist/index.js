"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const utils_1 = require("./utils/utils");
const app_1 = require("./app");
// Implementação do servidor local
const server = http.createServer(app_1.default);
// Utilizando utils para deixar código mais limpo
const port = utils_1.normalizePort(process.env.port || 3000);
server.listen(port);
server.on('error', utils_1.onError(server));
server.on('listening', () => utils_1.onListening(server));
