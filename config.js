const mongoose = require ("mongoose");
const connect = mongoose.connect("mongodb://127.0.0.1:27017/pretty");

connect.then(()=>{
    console.log("Bd connectée");
})
.catch(error => {
    console.error("Erreur de connexion à la base de données :", error);
});

const SignupLoginSchema =new mongoose.Schema({
    prenom:{
        type: String
    },
    nom:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String
    },
    googleId:{
        type: String
    },
    facebookId:{
        type: String
    },
    appleId:{
        type: String
    },
    photoURL:{
        type: String
    },
    provider:{
        type: String
    },
});

const collection = new mongoose.model("users",SignupLoginSchema);
module.exports = collection;