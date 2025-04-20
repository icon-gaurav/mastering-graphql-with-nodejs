import {ApolloServer} from "@apollo/server";
import {buildSubgraphSchema} from '@apollo/subgraph';
import {startStandaloneServer} from "@apollo/server/standalone";
import {orders,} from "../utils/data";
import { gql } from 'graphql-tag';

const typeDefs = gql`
    # This type is owned by the user service
    extend type User @key(fields: "id") {
        id: ID!  # required to match the key in the owning subgraph
    }

    # This type is owned by the product service
    extend type Product @key(fields: "id") {
        id: ID!
    }
    type Query {
        """ getOrder return Order based on Order id """
        getOrder(id: ID!): Order
        """ order return list of orders """
        orders:[Order]
    }

    type Order @key(fields: "id") {
        id: ID!
        quantity: Int
        orderDate: String
        user:User @provides(fields: "id")
        product:Product @provides(fields: "id")
    }
`;
const resolvers = {
    Query: {
        orders: async (_parent: any, _args: any, context: any) => {
            return orders;

        },

        getOrder: (_parent: any, args: any, _context: any) => {
            if (args?.id) {
                // search order based on order id in orders array
                const searchedOrder: any = orders.find(order => order?.id == args?.id)
                return searchedOrder;


            } else {
                return new Error("ID is required");
            }
        }
    },
    Order: {
        user(order: any) {
            return { __typename: 'User', id: order.userId };
        },
        product(order: any) {
            return { __typename: 'Product', id: order.productId };
        },
    },
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
startStandaloneServer(server, {listen: {port: 4001}})
    .then(({url}: any) => {
        console.log(`🚀 Server listening at: ${url}`);

    });
