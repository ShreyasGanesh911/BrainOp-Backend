const connectDataBase = require("./DB");
const app = require("./app");
require('dotenv').config()
const port =  process.env.PORT ||4000




// port
    connectDataBase().then(()=>{
        app.listen(port,()=>{
            console.log("Listening to port ",port)
        })
    }).catch((e)=>{
        console.log("Error connecting to mongodb",e)
    })
