const typeDefs = `#graphql
    type Query {
        getUser(id: ID!): User
        posts:[Post]
    }
    
    type Mutation{
        updatePost(_id: ID, title: String, content: String):Post
        createPost(_id: ID, title: String!, content: String):Post
        login(email: String!, password: String!):AuthPayload
        registerUser(email: String!, password: String!, username: String):User
    }
    
    type AuthPayload{
        token: String
        user: User
    }
    
    type User {
        _id: ID!
        username: String!
        email: String!
        posts: [Post]
    }
    
    type Post {
        _id: ID!
        title: String!
        content: String!
    }
`;

export default typeDefs;
