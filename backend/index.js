const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { users,messages } = require('./schema'); // Importing the user schema
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/complaintdb")
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log("Not connected", err));

// Schemas
const complaintSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    description: { type: String, required: true },
    usertype:{type:String,required:true},
    status: { type: String, default: "Pending" }
});



// Models
const Complaint = mongoose.model("complaint", complaintSchema);
// const UsersData = mongoose.model("usersdata", userSchema);

// ✅ Complaint APIs
app.post("/api/complaint", async (req, res) => {
    try {
        const newComplaint = new Complaint(req.body);
        const saveComplaint = await newComplaint.save();
        res.json({ message: 'Complaint saved successfully', data: saveComplaint });
    } catch (error) {
        res.status(500).json({ message: 'Failed to save complaint', error: error.message });
    }
});

app.get("/api/complaint", async (req, res) => {
    try {
        const data = await Complaint.find();
        res.json({ message: 'Complaints fetched successfully', data: data });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch complaints', error: error.message });
    }
});
app.post("/api/dataretrieve",async (req,res)=>{
    const {username}=req.body;

    const result=await Complaint.find({name:username});
     if(result){
         res.json({message:"data fetched",data:result});
     }


})

app.put("/api/complaint/:id", async (req, res) => {
    try {
        const updated = await Complaint.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: 'Complaint updated', data: updated });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update complaint', error: error.message });
    }
});

// ✅ User Registration API
app.post("/api/users",async (req, res) => {
    try {
        const {email,name,password}=req.body;
        // Check if user already exists
        const existinguser=await users.findOne({email:email, password:password});
        if(existinguser){
            res.json({message:"user already exist",data:existinguser})
        }
        else{
        const newUser = new users(req.body);
        const saveUser = await newUser.save();
        res.json({ message: 'User saved successfully', data:saveUser });
        }
    } catch (error) {
        res.json({ message: 'Failed to save user', error: error.message });
    }
});

app.post("/api/adminreply",async (req,res)=>{
    // const id=req.params.id;
    const {name,message,complaintId,sender}=req.body;
    const messageobject={sender:sender,text:message}
    const mess=await messages.findOne({complaintId:complaintId});
    if(mess){
        mess.message.push(messageobject);
        await mess.save();
         res.json({message:"data updated",data:mess});

    }
    else{
        const newMessage = new messages({name,message:[messageobject],complaintId});
        await newMessage.save();
         res.json({message:"message saved successfully",data:newMessage});
    }
   
    // console.log(mess);
    // console.log(messageobject);
})


//chat window data retrieve
app.post("/api/dataretreive",async (req,res)=>{
    try{
        const {complaintId}=req.body;
        const result = await messages.findOne({complaintId:complaintId});
        
        // console.log(result);
        // console.log(complaintId);
        if(!result){
            res.json({message:"no data found",data:[]});
        }
        else{
        res.json({message:"data found",data:result})
        }

    }
    catch(err){
        res.json({message:"error in data retreival" , data:err.message});
    }
})

app.post("/api/userlog" ,async (req,res)=>{
    try{
        const {email,password,usertype}=req.body;
         const userdata =await users.findOne({email});
         if(userdata.email === email && userdata.password === password && userdata.usertype === usertype){
            // Assuming you want to send a success message back to the client
            res.json({ message: 'User found', data:userdata });  
         }
         else{
            res.json({ message: 'User not found' });
         }
    }
    catch(err){
        res.json({message:"error in login" +err.message});
    }
})

app.put("/api/updatestatus",async (req,res)=>{
    try{
        const {complaintId,status}=req.body;
        const updated = await Complaint.findOneAndUpdate({_id:complaintId}, {status:status}, { new: true });
        if(updated){
            res.json({ message: 'Status updated successfully', data: updated });
        }
        else{
            res.json({ message: 'Complaint not found' });
        }
        // console.log(updated);
    }
    catch(err){
        res.json({message:"error in updating status" +err.message});
    
}
});


app.get("/api/admin", async(req,res)=>{
    const result=await Complaint.find();
    res.json({message:"data retrieved",data:result});
})

// ✅ Simple route5
app.get("/App", (req, res) => {
    res.send("Home page");
});


// ✅ Start Server
const port =3000;
app.listen(port, () => {
    console.log("Server is running on port " + port);
});
