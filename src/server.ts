import {
    ApolloServer
} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone'
import {ApolloGateway, IntrospectAndCompose} from '@apollo/gateway';

const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
        subgraphs: [
            { name: 'users', url: 'http://localhost:4003' },
            { name: 'products', url: 'http://localhost:4002' },
            { name: 'orders', url: 'http://localhost:4001' }
        ],
    })
})
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    gateway
});


// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
startStandaloneServer(server, {listen: {port: 4000}})
    .then(({url}: any) => {
        console.log(`🚀 Server listening at: ${url}`);

    });


