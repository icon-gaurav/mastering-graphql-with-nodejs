import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone'
import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers"
import mongoose from "mongoose";
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
startStandaloneServer(server, {listen: {port: 4000}})
    .then(({url}: any) => {
        console.log(`🚀 Server listening at: ${url}`);

        // connect the mongodb database
        // Database url from atlas cloud
        const DATABASE_URL: string = `mongodb+srv://gauravbytes:Zah5jnclaMXbzANl@gauravbytes.buvimdx.mongodb.net/?retryWrites=true&w=majority`
        mongoose.connect(DATABASE_URL)
            .then(() => {
                console.log('Database connected successfully')
            })
            .catch((e: any) => {
                console.log('Error connecting : ', e?.message)
            })
    });


