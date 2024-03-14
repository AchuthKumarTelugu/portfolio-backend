const mongoose=require("mongoose")
mongoose.connect(process.env.MONGO_URI)
console.log(process.env.MONGO_URI)
const db=mongoose.connection
//checking connection status
db.once('open',()=>{
    console.log('connection to database is established')
})
db.on('error',(err)=>{
    console.log('Error in connection'+ err);
})
module.exports=db