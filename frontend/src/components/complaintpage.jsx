import {useState} from 'react';
import './sign.css';
import Status from "./status.jsx";
import { LucideHeading5 } from 'lucide-react';
export default function Complaintpage({username}){
   const back=()=>{
    window.location.reload();
   } 
   const handlechange=(e)=>{
         setform({...form,[e.target.name]:e.target.value});
   }

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api  = `${BASE_URL}/api/complaint`;

   const savedata=async (e)=>{
       e.preventDefault();
          const formData = new FormData();
formData.append("name", form.name);
formData.append("address", form.address);
formData.append("city", form.city);
formData.append("state", form.state);
formData.append("pincode", form.pincode);
formData.append("description", form.description);
formData.append("usertype", form.usertype);
formData.append("status", form.status);
if(image){formData.append("image", image); }else{formData.append("image", " ");}
       try{
        const res=await fetch(api,{
            method:"POST",
            // headers:{"Content-Type":"application/json"},
            body:formData,
     
        });
        console.log(form);
        console.log(image);
        console.log(res);

        if(!res.ok) throw new Error("failed to add data");
        
        const data=await res.json();
        if(data.message === 'Complaint saved successfully'){
            alert("Complaint Registered Successfully");
            setform({name:'',address:'',city:'',state:'',pincode:'',image:null, description:'',status:'Pending',usertype:'user'});
            setpage("status");
            console.log(page);
        }
        else{
            alert("not registered ");
        }
       }
       catch(err){
        console.log(err);
       }
   }

   const openstatus =()=>{
    setpage("status");
    console.log("status page opened");
   }
    const [image,setimage]=useState(null);
    const [page,setpage]=useState("complaintpage");
    const [form,setform]=useState({name:'',address:'',city:'',state:'',pincode:'',description:'',status:'Pending',usertype:'user'});
    return (
        <>
        {page === 'complaintpage' && (
            <>
            <nav id="complaintnav">
                <h3>Hello,{username}</h3>
                {/* <button id="reg">Register complaint</button> */}
                <button id="status" onClick={openstatus}>Check Status</button>
                <button onClick={back}>Log out</button>
                </nav>
            <section id="complaint">
                <div className="complaint1">
                    <form onSubmit={savedata}>
                        <div className="complainthead">
                        <label >Name:</label><br></br>
                        <input type="text" name="name" onChange={handlechange} required/><br></br>
                        <label >Address:</label><br></br>
                        <input type="text" name="address" onChange={handlechange}  required/><br></br>
                        <label>City:</label><br></br>
                        <input type="text" name="city" onChange={handlechange} required/><br></br>
                         <label>State:</label><br></br>
                        <input type="text" name="state" onChange={handlechange} required/><br></br>
                        </div>
                        <div className="complainthead">
                        <label>Pincode:</label><br></br>
                        <input type="text" name="pincode" onChange={handlechange} required/><br></br>
                          <label>Description: </label><br></br>
                        <textarea rows="5" cols="50" name="description"onChange={handlechange} required></textarea><br></br>
                        <label>image: </label><h5>Size should be less than 16MB</h5><br></br>
                        <input type="file" name="image"  accept="image/*" onChange={(e)=>setimage(e.target.files[0])} id="img"/><br></br>
                        <br />
                        <button type="submit" id="complaintbtn">Submit</button>
                        </div> <br></br>
                         
                    </form>
                </div>
            </section>
            </> )}
            {page ==="status" && <Status username={username} />}

        </>
    )
}


