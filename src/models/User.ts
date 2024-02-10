import mongoose, {Schema} from 'mongoose';

// defining user schema
const userSchema =  new Schema({
    username:String,
    email: {
        type:String,
        unique:true
    },
    password:String
});

// defining user model
const User = mongoose.model("User", userSchema);

export default User;
