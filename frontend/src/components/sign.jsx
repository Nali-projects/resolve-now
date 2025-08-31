import './sign.css';
import Log from './log.jsx';
import React, {useState,useEffect} from 'react';
import { Eye, EyeOff } from "lucide-react"; 
import Complaintpage from './complaintpage.jsx';
import Admin from './admin.jsx';


//   const adddata= async ()=>{
//     try{
//       const res=await fetch(api,{
        // method:"POST",
        // headers:{'Content-Type':'application/json'},
        // body:JSON.stringify(form),
//       });
//       if(!res.ok)throw new Error("failed to insert data")
//         setForm({name: '',type: ''}); 
//     }
//     catch(err){
//       console.log(err);
//     }

//   };

export default function Sign() {

  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api  = `${BASE_URL}/api/users`;

  const [form,setForm]=useState({name:'',email:'',password:'', usertype:'' });
const senddata=async (e)=>{
    e.preventDefault();
    const validate = (password)=>{
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return regex.test(password);
    }
    if(!validate(form.password)){
      alert("Password must be at least 8 characters long and contain at least capital letter, a number, and a special character.");
      return;
    }
    try{
       const res=await fetch(api,{
        method:"POST",
        headers:{'content-type':'application/json'},
        body:JSON.stringify(form),
         });
      if(!res.ok)throw new  Error('failed to add data');
      setForm({name:'',email:'',password:'', usertype:''}); 
      console.log(form); 
      const data=await res.json();
      if(data.message === 'User saved successfully'){
        alert("Signed In Successfully");
        setuser(data.data.name);
        if(data.data.usertype === 'admin'){
          setpage('admin');
        }
        else if(data.data.usertype === 'user'){
          setpage('complaintpage');
        }
        // setpage('complaintpage');
      }
      else{
         alert("User already exists, please log in");
        setpage('log');
      }
     

    }
    catch(err){
      console.log(err);
    }
  }

  const togglepassword=()=>{
    setshowpassword(!showpassword);
  }
  
  const arr =['select','user','admin'];
  
  const [page,setpage]=useState("sign");
  const [user,setuser]=useState("");
  const [showpassword,setshowpassword]=useState(false);
 
  
function insert(){


}
function back(){ 
  window.location.reload();}
function openlog(){ setpage('log'); }
  return (
    <>

    {page === "sign" && (
      <>
      <nav> 
        <h1>Resolve Now</h1>
        <button id="home" onClick={back}>Home</button>
        <button id="log-in"onClick={openlog}>Login</button>
        </nav>
      <section id="signin">
        <div className="signin1">
          <h2>sign in</h2>
          <form onSubmit={senddata}>
            <label htmlFor="text">Name:</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value})} required/>
            <br></br>
            <label>Type</label> 
            <select value={form.usertype}  onChange={(e) => setForm({ ...form,usertype:e.target.value })} required >
              {arr.map((i,index)=>(<option key={index}  value={i}>{i}</option>))} 
            </select>
            <br></br>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={form.email}
             onChange={(e) => setForm({ ...form, email: e.target.value})
            } required /> <br></br>
            <label htmlFor="password">Password:</label>
            <input type={showpassword ? "text" :"password"} id="password" name="password"
            value={form.password}
            onChange={(e)=>setForm({...form,password:e.target.value})}
             required />
             <span onClick={togglepassword} className="eye">{showpassword ? <Eye />: <EyeOff />}</span>
            <br></br>
            <button type="submit">Sign In 🔒</button>
          </form>
        </div>
      </section>
     </>
    )} 
    {
      page === "log" && <Log />
    }
    {page === "admin" && <Admin username={user}/>}
    {page === "complaintpage" && <Complaintpage username={user}/>}
    </>
  );
}

