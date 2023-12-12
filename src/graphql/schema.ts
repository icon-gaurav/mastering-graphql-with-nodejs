const typeDefs = `#graphql
    type Query {
        getUser(id: ID): User
        posts:[Post]
    }
    
    type User {
        id: ID!
        username: String!
        email: String!
        posts: [Post]
    }
    
    type Post {
        id: ID!
        title: String!
        content: String!
    }
`;

export default typeDefs;
