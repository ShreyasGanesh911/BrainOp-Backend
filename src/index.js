const app = require("./app");
require('dotenv').config()
const port =  process.env.PORT ||4000




// port
app.listen(port,()=>{
    console.log("Listening to port ",port)
})