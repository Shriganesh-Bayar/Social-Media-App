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
    register:async ({userName, email, unhashedPassword})=>{
        const password = bcrypt.hashSync(unhashedPassword, 10);
        try{
            let result=await User.insertOne({userName,email,password});
            // console.log(result);
            return result;
        } catch(err){
            return {
                error: "Bad Reuqest"
            }
        }    
    },
    login:async ({userName, password})=>{
        try{
            let user=await User.findOne({userName});
            console.log(user);
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