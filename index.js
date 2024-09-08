const express = require("express");
const app = express();
const path = require("path");

app.use(express.urlencoded({extended:true})); // for data parsing- express data smjh pae

app.use(express.static(path.join(__dirname,"public"))); // for css

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.listen(8080,()=>{
    console.log("Listening on port 8080");
})

//npm i uuid - to create universal unique ids
const {v4:uuidv4} = require("uuid");

let posts = [
    {
        id:uuidv4(),
        username: "abc",
        content : "I got placed"
    },
    {
        id:uuidv4(),
        username: "xyz",
        content : "I am doing good in business"
    },   
    {
        id:uuidv4(),
        username: "pqrs",
        content : "I have opened a jewellary shop"
    },
]

//Home page INDEX get request API
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

//NEW post get request
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

//New post, POST request with redirect(Get request) to INDEX page
app.post("/posts",(req,res)=>{
    let {username,content}= req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
})

//VIEW post get request : /posts/:id
app.get("/posts/:id",(req,res)=>{
    const id = req.params;
    let post;
    for(let p of posts){
        if(p.id === id.id){
           post = p;
        }
    }
    res.render("fullpost.ejs",{post,});
});


//EDIT request (get request) to form
app.get("/posts/:id/edit",(req,res)=>{
    const id = req.params;
    let post;
    for(let p of posts){
        if(p.id === id.id){
           post = p;
        }
    }
    res.render("editpost.ejs",{post,});
})

//With html we can only send get and post request so now we have to npm install method-override to overwrite req
let methodoverride = require("method-override");
app.use(methodoverride("_method"));

app.patch("/posts/:id",(req,res)=>{
    let newcontent = req.body.content; // as textarea name is content
    const id = req.params;
    let post;
    for(let p of posts){
        if(p.id === id.id){
           post = p;
        }
    }
    post.content = newcontent;
    console.log(post);
    res.redirect("/posts");
})

//DELETE POST USING METHOD OVERRIDE

//EDIT request (get request) to form
app.delete("/posts/:id",(req,res)=>{
    const id = req.params;
    let post;
    for(let p of posts){
        if(p.id === id.id){
           post = p;
        }
    }
    let idx = posts.indexOf(post);
    if (idx!== -1) {
        posts.splice(idx, 1);
    }
    res.redirect("/posts");
})
