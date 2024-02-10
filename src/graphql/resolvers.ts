import {posts, users, users_posts} from "../../utils/data";
import Post from "../models/Post";

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
        }
    }
}

export default resolvers;
