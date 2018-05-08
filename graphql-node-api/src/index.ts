import * as http from 'http';
import { normalizePort, onError, onListening } from './utils/utils';

import app from './app';
import db from './models';

// Implementação do servidor local
const server = http.createServer(app);

// Utilizando utils para deixar código mais limpo
const port = normalizePort(process.env.port || 3000);

// Sync do Sequelize com MySQL, só vai iniciar quando o sequelize sincronizar, por isso o uso do .then()
db.sequelize.sync()
    .then(() => {
        server.listen(port);
        server.on("error", onError(server));
        server.on("listening", () => onListening(server));
    })


