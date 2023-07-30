const express = require('express');
const Quote = require('inspirational-quotes');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const salt = 10;

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
let dbCon = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ticket"

})
dbCon.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });




app.post('/register', (req, res) => {
        const email = req.body.email
        const username = req.body.username
        const password = bcrypt.hashSync(req.body.password,salt,null)
        dbCon.query("INSERT INTO users (username,password,email) VALUES(?,?,?)",[username,password,email],(err,result) => {
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
    }) 
})
app.post('/login',(req,res) => {
    dbCon.query("SELECT * FROM users WHERE username = ?",[req.body.username],(err,data) => {
        if(err) return console.log("Server error") 
        if(data.length > 0){
            bcrypt.compare(req.body.password, data[0].password,(err,result) => {
                if(err) return res.send({Error: "Password compare error"})
                if(result){
                    return res.send({Status: "Success"})
                }else{
                    return res.send({Error: "Password not match"})
                }
            })
        }else{
            return res.send({Error:"No username existed"})
        }
    
    })
})
app.get('/ticket',(req,res)  =>{
    dbCon.query("SELECT * FROM ticket",(err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})
app.get('/ticket/:id',(req,res)  =>{
    const id = req.params.id
    dbCon.query("SELECT * FROM ticket WHERE status = ?",[id],(err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})
app.post('/create',(req,res) => {
    const title = req.body.title;
    const description = req.body.description;
    const contract = req.body.contract;
    const information = req.body.information;
    const createat = new Date(new Date().getTime() - (new Date().getTimezoneOffset() *2 )* 60 * 1000).toJSON().slice(0, 19).replace('T', ' ')
    const updateat = new Date(new Date().getTime() - (new Date().getTimezoneOffset() *2 )* 60 * 1000).toJSON().slice(0, 19).replace('T', ' ')
    dbCon.query("INSERT INTO ticket (title, description, contract, information, createat, updateat) VALUES(?,?,?,?,?,?)",
    [title, description, contract, information, createat, updateat],
    (err, result)=> {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})
app.get('/edit/:id',(req,res) => {
    const id = req.params.id
    dbCon.query("SELECT * FROM ticket WHERE id = ?",[id],(err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})
app.put('/edit/:id',(req,res)=>{
    const id = req.body.id
    const information = req.body.information;
    const updateat = new Date(new Date().getTime() - (new Date().getTimezoneOffset() *2 )* 60 * 1000).toJSON().slice(0, 19).replace('T', ' ')
    console.log(information)
    dbCon.query("UPDATE ticket SET information = ? ,updateat = ? WHERE id= ?",[information,updateat,id],(err,result) => {
        if(err){
            console.log(err)
            console
        }else{
            res.send(result)
        }
    })
})

app.listen(5000, () => {
    console.log('Server start on port 5000');
})
module.exports = app;