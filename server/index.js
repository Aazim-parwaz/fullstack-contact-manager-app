const express=require('express');
const app=express();

const bodyParser=require('body-parser');
const mysql=require('mysql2');
const cors=require('cors');


const db=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Aazim20800",
    database:"contactDb"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/get',(req,res)=>{
     const sqlGet="select * from contact";
     db.query(sqlGet,(error,result)=>{
        res.send(result);
     });
});

app.post("/api/post",(req,res)=>{
     const {name,email,contact}=req.body;
     const sqlInsert="insert into contact(name,email,contact) values(?,?,?)";
     db.query(sqlInsert,[name,email,contact],(error,result)=>{
        if(error){
            console.log(error);
        }
     })
});

app.delete("/api/remove/:id",(req,res)=>{
    const {id}=req.params;

    const sqlRemove="delete from contact where id=?";
    db.query(sqlRemove,id,(error,result)=>{
       if(error){
           console.log(error);
       }
    })
});

app.get('/api/get/:id',(req,res)=>{
    const {id}=req.params;
    const sqlGet="select * from contact where id=?";
    db.query(sqlGet,id,(error,result)=>{
       if(error){
        console.log(error);
       }
       res.send(result);
    });
});

app.put('/api/update/:id',(req,res)=>{
    const {id}=req.params;
    const {name,email,contact}=req.body;
    const sqlUpdate="update contact set name=?, email=?, contact=? where id=?";
    db.query(sqlUpdate,[name,email,contact,id],(error,result)=>{
       if(error){
        console.log(error);
       }
       res.send(result);
    });
});

app.get('/',(req,res)=>{
    const sqlInsert="insert into contact(name,email,contact) values('monika','monika@ymail.com','886213344')";
    db.query(sqlInsert,(err,result)=>{
        console.log("error: ",err);
        console.log("result: ",result);
        res.send('hello world');
    })
})

 







app.listen(5000,()=>console.log('server running on 5000'));