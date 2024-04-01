import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { createServer } from 'http';
import express from 'express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import { useServer } from 'graphql-ws/lib/use/ws';
import resolvers from './graphql/resolvers'
import typeDefs from "./graphql/schema";
import mongoose from "mongoose";

async function startServer(){
    const app = express();

    const httpServer = createServer(app);

    const schema = makeExecutableSchema({
        resolvers,
        typeDefs,
    });

    // Creating the WebSocket server
    const wsServer = new WebSocketServer({
        // This is the `httpServer` we created in a previous step.
        server: httpServer,
        // Pass a different path here if app.use
        // serves expressMiddleware at a different path
        path: '/subscriptions',
    });

// Hand in the schema we just created and have the
// WebSocketServer start listening.
    const serverCleanup = useServer({ schema }, wsServer);

    const apolloServer = new ApolloServer({
        schema,
        introspection:true,
        plugins: [
            // Proper shutdown for the HTTP server.
            ApolloServerPluginDrainHttpServer({ httpServer }),

            // Proper shutdown for the WebSocket server.
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
        ],
    });

    await apolloServer.start();

    app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(apolloServer));

    const DATABASE_URL: string = `mongodb+srv://gauravbytes:Zah5jnclaMXbzANl@gauravbytes.buvimdx.mongodb.net/?retryWrites=true&w=majority`
    mongoose.connect(DATABASE_URL)
        .then(() => {
            console.log('Database connected successfully')
        })
        .catch((e: any) => {
            console.log('Error connecting : ', e?.message)
        })

    const PORT = 4000;
// Now that our HTTP server is fully set up, we can listen to it.
    httpServer.listen(PORT, () => {
        console.log(`Server is now running on http://localhost:${PORT}/graphql`);
    });
}

startServer();
