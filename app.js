const express = require("express");
const cors = require('cors');
const mysql = require("mysql");
const bodyParser = require('body-parser')
const multer = require('multer')
const upload = multer() 


const app = express();
app.use(cors());
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 

const db = mysql.createConnection({
    host:"localhost",
    user:"root", // sesuaikan dengan user database
    password:"root", //sesuaikan dengan password database
    port:8889, //sesuaikan dengan port mysql
    database:"absensi"
})

db.connect((e)=> {
    if(e){
        console.log("error")
        throw(e)
    }else{
        console.log('connection done')
    }
});

app.get("/get", (req, res) => {
    let sql = `SELECT * FROM data ORDER BY created DESC`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        if(result.length > 0){
            res.status(200).json({
                'status' : true,
                'message' : 'success',
                'result' : result
            });
        }else{
            res.status(404).json({
                'status' : false,
                'message' : 'failed',
            });
        }
    })
})

app.post("/post", (req, res) => {
    let sql = `INSERT INTO data SET ?`
    let query = db.query(sql, req.body, (err, result) => {
        if(err) throw err;
        if(result){
            res.status(200).json({
                'status' : true,
                'message' : 'post data successfully created',
            });
        }else{
            res.status(404).json({
                'status' : false,
                'message' : 'post data failed',
            });
        }
    })
})

app.listen("3333", () => {
    console.log('Server running on port 3333'); // gunakan port yang tidak digunakan
})