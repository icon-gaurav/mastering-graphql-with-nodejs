const typeDefs = `#graphql
    type Query {
        """ Get user return user based on user id """
        getUser(id: ID!): User
        """ posts return list of posts """
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
        """ Database generated user id """
        _id: ID!
        """ Username of the user to uniquely identify the user """
        username: String!
        """ Email address of the user """
        email: String!
        """ List of posts associated with the user """
        posts: [Post]
    }
    
    type Post {
        _id: ID!
        title: String!
        content: String!
    }
`;

export default typeDefs;
