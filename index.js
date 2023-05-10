const express = require("express")
const cors = require("cors")
const bodyParser = require ("body-parser")
const jwt =require("jsonwebtoken")

//middelwares

const app = express();
app.use (express.json())
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false })) 

// parse application/json
app.use(bodyParser.json()) 
let secretCode = 12;
let secretKey = "ameni";
const data =[
    {
        film:"harry potter",
        year:2016
    },
    {
        film: "hello",
        year:1991
    },
];

function CreateToken(req,res,next) {

    const user = [
    {username:req.body.username},
    {password:req.body.password},

    ]
    jwt.sign(user,secretKey,(err,resultat)=>
    {
        if(err){
            res.send("error")
        }else{
            res.json({token:resultat})
        }
    } 
    );
    next();



}

app.post("/login",CreateToken,(req,res)=>{});


app.get("/data/:id",(req,res)=>{
    if(req.params.id == secretCode){
        res.json(data);
    }else{
        res.send("Vous n'êtes pas autorisé à effectuer cette opération ")
    }

}
);



app.listen(8080,()=>
console.log('server work'))