const express = require("express")
const app = express();
app.use(express.json())
const fs = require("fs")

const users = [
    {id:1, FirstName:"daniel",LastName:"Biton",Email:"biton123654@gmail.com"},
    {id:2, FirstName:"Netanel",LastName: "Malka",Email: "malka123654@gmail.com"},
    {id:3, FirstName:"Bentzi",LastName: "Bentzelovich", Email: "benchi123654@gmail.com" },
    
]

fs.writeFileSync("users.json",JSON.stringify(users,null,2))

function getFileJson(){
    const result = fs.readFileSync("users.json","utf8")
    return JSON.parse(result)

}

//method GET

// option with params
//get specific user
let usersFile;
app.get("/getbyID/:id",(req,res) => {
    usersFile = getFileJson()
    const user =  usersFile.find(u => u.id === parseInt(req.params.id))
    if(!user) res.send("the user was not found")
    res.send(user)    
        })
// //get all users
app.get("/users",(req,res) => {
    usersFile = getFileJson()
    res.send(usersFile)
})



//option b with query
//get the users that client asked

// let lstFilterd;
app.get("/users",(req,res) => {
    usersFile = getFileJson()
    const lstFilterd = usersFile.filter(user => {
        
        return Object.entries(req.query).some(([key, value]) => user[key] == value);
    });

   
    res.send(lstFilterd)
})

//method POST
// fs.writeFileSync("users.json",JSON.stringify(users,null,2))
app.post("/users",(req,res) => {
    
    usersFile = getFileJson()
    
    const newUser = {
        id: usersFile.length+1,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email

    }
    usersFile.push(newUser)
    fs.writeFileSync("users.json",JSON.stringify(usersFile,null,2))
    res.send("the user is added successfuly")

})



//method PUT
app.put("/users/:id",(req,res) => {
    usersFile = getFileJson()
    
    const user = usersFile.find(u => u.id === parseInt(req.params.id))
    if(!user) res.send("the user was not found")
       
                   
    user.FirstName = req.body.FirstName,
    user.LastName = req.body.LastName,
    user.Email = req.body.Email
   
    fs.writeFileSync("users.json",JSON.stringify(usersFile,null,2))
                            
    res.send("the user is updated successfuly")    

    
})

//method DELETE
app.delete("/users/:id",(req,res) =>{
    usersFile = getFileJson()
       
    const user = usersFile.find(u => u.id === parseInt(req.params.id))
    if(!user) return res.send("the user was not found")

    const index = usersFile.indexOf(user) 
    usersFile.splice(index,1)
    fs.writeFileSync("users.json",JSON.stringify(usersFile,null,2))   

    res.send("the user is deleted successfuly")
})

app.listen(300,() => {console.log("the server start running...")})








//get users from jsonplaceholder and put in json file
// let data;
// async function getUsers() {
//     try{
//         const response = await fetch("https://jsonplaceholder.typicode.com/users")
//         data = await response.json()
//         fs.writeFileSync("database.json",JSON.stringify(data,null,2))
//     }
//     catch(error){
//         console.log(error)

//     }   
//  }
 
// getUsers()

// app.post("/addUser",(req,res) => {
//     const result = fs.readFileSync("database.json","utf8")
//     const dataFile = JSON.parse(result)

    // console.log(req.body)
    // const user = {id:data.length+1,
    //                name: req.body.name,
    //                username: req.body.username,
    //                email: req.body.email,
    //                address: {
    //                 street: req.body.address.street,
    //                 suite: req.body.address.suite,
    //                 city: req.body.address.city,
    //                 zipcode: req.body.address.zipcode,
    //                 geo: {
    //                     lat: req.body.address.geo.lat,
    //                     lng: req.body.address.geo.lng
    //                 }                 
    //             }
//     //             }
//     dataFile.push(user)

//     fs.writeFileSync("database.json",JSON.stringify(dataFile,null,2))                
//     // users.push(user)
//     // res.send(users)
//     res.send("successfuly")
// })
