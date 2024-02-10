import {posts, users, users_posts} from "../utils/data";
import Post from "../models/Post";
import User from "../models/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const resolvers = {
    Query: {
        posts: async () => {
            return await Post.find();
        },

        getUser: (_parent: any, args: any, _context: any) => {
            if (args?.id) {
                //search the user based on user id in users array
                const searchedUser: any = users.find(user => user?.id == args?.id)
                // search the posts written by the user
                const userPostRelationships = users_posts?.filter(rel => rel?.userId === searchedUser?.id);
                const userPostIds = userPostRelationships.map(rel => rel?.postId);
                // combine the result and return
                searchedUser['posts'] = posts.filter(post => userPostIds.includes(post?.id));
                return searchedUser;
            } else {
                return new Error("ID is required");
            }
        }
    },
    Mutation: {
        updatePost: (_parent: any, args: any, _context: any) => {
            if (args?.id) {
                // search the post
                const post: any = posts.find(p => p?.id == args?.id)
                //update the post if post exist
                if (post) {
                    post.title = args?.title ?? post?.title;
                    post.content = args?.content ?? post?.content;
                    //return updated post
                    return post;
                } else {
                    return new Error("Post not found with the provided id");
                }
            } else {
                return new Error("ID is required")
            }
        },
        createPost: async (_parent: any, args: any, _context: any) => {
            // create new post document
            const post = new Post(args);
            //save post document and return the saved document
            return await post.save();
        },
        login: async (_parent: any, args: any, _context: any) => {
            const {email, password} = args;
            const requestedUser = await User.findOne({email: email});
            /*
                we are using bcrypt to compare 2 passwords as we stored hashed password and not the plain text
                for security reasons
            */
            if (requestedUser && bcrypt.compareSync(password, requestedUser?.password as string)) {
                // user has provided correct email and password
                // generate the signed jwt token
                const token = jwt.sign({user_id:requestedUser?._id, email:requestedUser?.email}, "myprivatekey", {expiresIn: '2h'})

                // return the auth payload
                return {
                    token,
                    user: requestedUser
                }
            } else {
                return new Error('Email or password is incorrect!')
            }
        },
        registerUser: async (_parent: any, args: any) => {
            const {email, password, username} = args;
            // we are storing hashed password to the database
            const newUser = new User(
                {
                    email,
                    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
                    username: username ?? email
                })
            return await newUser.save();
        }
    }
}

export default resolvers;
