const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

let userSchema=new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },

})

const User=mongoose.model("User",userSchema);

module.exports = {
    register:async ({username, email, password})=>{
        let password2 = bcrypt.hashSync(password, 10);
        try{
            let result=await User.insertOne({userName:username,email,password:password2});
            return result;
        } catch(err){
            return {
                error: "Bad Reuqest"
            }
        }    
    },
    login:async ({username, password})=>{
        try{
            let user=await User.findOne({userName:username});
            // console.log(user);
            if(user===null) {
                return {error: "user does not exists"}
            }
            if (bcrypt.compareSync(password, user.password)) {
                return user;
            } 
            return {error: "Bad credentials"}
        } catch(err){
            return {error: "Bad Request"}
        }

    },

};