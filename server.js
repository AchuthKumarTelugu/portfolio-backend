const express=require('express')
const app=express()
const cors=require('cors')
const path=require('path')
app.use(cors())
app.use(express.json())
require('dotenv').config()
const db=require('./config/dbConfig')
app.use('/api/portfolio',require('./routes/portfolioRoute'))
app.get('/',(req,res)=>{
    res.json({msg:'hello world'})
})
//checking if code running environment is production or not
if(process.env.NODE_ENV === "production") 
{
    app.use(express.static(path.join(__dirname, "frontend-portfolio/build"))); //specifiying client/frontend location
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "frontend-portfolio/build/index.html"));
    } );
}

app.listen(3000,()=>{
    console.log('server is listening on 3000')
})