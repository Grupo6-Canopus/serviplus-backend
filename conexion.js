const mongoose = require("mongoose");

const username = "admin";
const password = "admin";
const database = "dbServiplus";
const URI = "mongodb+srv://"+username+":"+password+"@cluster0.uojw4ee.mongodb.net/"+database+"?retryWrites=true&w=majority";

const conectar = async () =>{
    try {
        await mongoose.connect(URI);
        console.log("Atlas está en línea");
    } catch (error) {
        console.log("Error de conexión. "+error);
    }
    /*
    mongoose.connect(URI)
        .then(()=>{ console.log("Atlas está en línea"); })
        .catch(()=>{ console.log("Error de conexión. "+error); })
    */
}
conectar();

module.exports = mongoose;