const express=require('express');
const uuid=require('uuid');
const UserData=require("../userData.json");
const router=express.Router();

router.get("/",(req,res)=>{
    const value={
        "request_time" : req.myLogger,
        "data": UserData
    }
    res.status(200).json(value);
})

router.get("/address/:id",(req,res)=>{
    const user = UserData.find((user) => user.id === Number(req.params.id));
    if(!user){
        res.status(400).send("User not found");
    }
    const value={
        "request_time" : req.myLogger,
        "data": user
    }
    res.status(200).json(value);
})

router.post("/address",(req,res)=>{
    // * Create a new user
    try{
        const {floor,street,landmark,locality,pincode}=req.body
        if(!floor) throw new Error("floor is required");
        if(!street) throw new Error("Street is required");
        if(!landmark) throw new Error("Landmark is required");
        if(!locality) throw new Error("Locality is required");
        if(!pincode) throw new Error("pincode is required");
        const user={
            id: uuid.v4(),
            floor,
            street,
            landmark,
            locality,
            pincode
        }
        UserData.push(user);
        res.status(201).json(user);
    }
    catch(err){
      res.status(400).send(`Invalid request: ${err.toString()}`)
    }
})

router.patch("/address/:id",(req,res)=>{
    const user = UserData.find((user) => user.id === Number(req.params.id));
    if(!user){
        res.status(400).send("User not found");
    }
    user.author=req.body.author;
    user.published_year=req.body.published_year;
    res.send(user)
})

router.delete("/address/:id",(req,res)=>{
    const userIndex = UserData.findIndex((user) => user.id === Number(req.params.id));
    if(!userIndex){
        res.status(400).send("User not found");
    }
    UserData.splice(userIndex, 1);
    res.send(UserData)
})

module.exports = router;