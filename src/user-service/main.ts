import {ApolloServer} from "@apollo/server";
import { buildSubgraphSchema } from '@apollo/subgraph';
import {startStandaloneServer} from "@apollo/server/standalone";
import { users, } from "../utils/data";
import { gql } from 'graphql-tag';
const typeDefs = gql`
type Query {
    """ getOrder return Order based on Order id """
    getUser(id: ID!): User
    """ order return list of orders """
    users:[User]
}



type User @key(fields: "id") {
    id: ID!
    name: String
    email: String
}
`;
const resolvers = {
    Query: {
        users: async (_parent: any, _args: any, context: any) => {
            return users;

        },

        getUser: (_parent: any, args: any, _context: any) => {
            if (args?.id) {
                // search order based on order id in orders array
                const searchedUser: any = users.find(u => u?.id == args?.id)
                return searchedUser;


            } else {
                return new Error("ID is required");
            }
        }
    },
    User: {
        __resolveReference(user:any) {
            return users.find(u => u.id === user.id);
        }
    }

}


const server = new ApolloServer({
    schema: buildSubgraphSchema([{
        typeDefs,
        resolvers,
    }])
});


// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
startStandaloneServer(server, {listen: {port: 4003}})
    .then(({url}: any) => {
        console.log(`🚀 Server listening at: ${url}`);

    });
