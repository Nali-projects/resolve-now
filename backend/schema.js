const mongoose=require("mongoose");
const userSchema = new mongoose.Schema({
    name: { type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    usertype: { type: String, required: true }
});
const users=mongoose.model("usersdata",userSchema);

//message from chatbot
const messageschema=new mongoose.Schema({
    name:{type:String,required:true},
    message:[{sender:{type:String,required:true},text:{type:String,required:true}}],
    date:{type:Date,default:Date.now},
    complaintId:{type:String,required:true}
})
const messages=mongoose.model("messages",messageschema);
module.exports={
    users,
    messages
};