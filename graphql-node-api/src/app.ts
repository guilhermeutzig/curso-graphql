import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';

import schema from './graphql/schema';

class App {

    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
    }

    // GraphiQL seria a interface para rodar os comandos do GraphQL
    private middleware(): void {

        this.express.use('/graphql', graphqlHTTP({
            schema: schema,
            graphiql: process.env.NODE_ENV.trim() === 'development'
        }));

    }

}

export default new App().express;