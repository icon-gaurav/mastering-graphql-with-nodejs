import {posts, users, users_posts} from "../../utils/data"

const resolvers = {
    Query: {
        posts: () => {
            return posts;
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
        }
    }
}

export default resolvers;
