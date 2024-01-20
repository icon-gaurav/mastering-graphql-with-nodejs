import mongoose, {Schema} from 'mongoose';

// defining post schema
const postSchema =  new Schema({
    title:String,
    content:String
});

// defining post model
const Post = mongoose.model("Post", postSchema);

export default Post;
