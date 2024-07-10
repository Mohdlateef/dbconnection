const express=require("express");
const mongoose=require("mongoose");
const usermodel=require("./UserSchema")

const app=express();
 const monooge_uri="mongodb+srv://umer:umer123@cluster0.nrmg0fv.mongodb.net/JunertestDb"

const port =8000;

app.use(express.urlencoded({extended:true}))

app.get("/user_form",(req,res)=>{


    return res.send(
        `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>user form</h1>
    <form action="form_submit" method="POST">
        <label for="name">Name</label>
        <input type="text" id="name" name="name">
        <label for="email">Email</label>
        <input type="text" id="email"  name="email">
        <label for="password">password</label>
        <input type="password" name="password">
        <button type="submit">submit</button>


        </form>
</body>
</html>
        `
    )
})

app.post ("/form_submit",async (req,res)=>{
 console.log("un")
 
    console.log(req.body);
    // console.log(req)
let{Name,Email,password}=req.body;
try{
//Create
userDb=await usermodel.create({  // IO Bond
    //schema:client
    name:Name,
    email:Email,
    password:password,

})
    return res.send({
        message:"user create sucessfully",
        status:200,
        data:userDb,
    })}
    catch (err){
        res.send({
            messaage:"internal server error",
            error:err,
        })

    }
})




















mongoose.connect(monooge_uri).then(()=>{
    console.log("mongodb connected succesfuly")

}).catch((err)=>{
console.log(err)
});


app.listen(port ,()=>{

    console.log("server is running")
})