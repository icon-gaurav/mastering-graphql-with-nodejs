import {ApolloServer} from "@apollo/server";
import { buildSubgraphSchema } from '@apollo/subgraph';
import {startStandaloneServer} from "@apollo/server/standalone";
import {products} from "../utils/data";
import { gql } from 'graphql-tag';

const typeDefs = gql`
type Query {
    """ getOrder return Order based on Order id """
    getProduct(id: ID!): Product
    """ order return list of orders """
    products:[Product]
}

type Product @key(fields: "id") {
    id: ID!
    name: String
    price: Float
}
`;
const resolvers = {
    Query: {
        products: async (_parent: any, _args: any, context: any) => {
            return products;

        },

        getProduct: (_parent: any, args: any, _context: any) => {
            if (args?.id) {
                // search order based on order id in orders array
                const searchedProduct: any = products.find(p => p?.id == args?.id)
                return searchedProduct;


            } else {
                return new Error("ID is required");
            }
        }
    },
    Product: {
        __resolveReference(product:any) {
            return products.find(p => p.id === product.id);
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
startStandaloneServer(server, {listen: {port: 4002}})
    .then(({url}: any) => {
        console.log(`🚀 Server listening at: ${url}`);

    });
