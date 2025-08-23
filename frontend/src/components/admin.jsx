import { useState, useEffect } from "react";
import {io} from "socket.io-client";
import "./sign.css";
import Stats from "./stats.jsx";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function Admin({ username }) {

  const socket=io("http://localhost:3000",{
    transports:["websocket"],
     reconnection:true,
        reconnectionAttempts:10,
        reconnectionDelay:1000
  });
  const api = "http://localhost:3000/api/admin";
  const api2 = "http://localhost:3000/api/adminreply";
  const api3 = "http://localhost:3000/api/dataretreive";
  const api4= "http://localhost:3000/api/updatestatus";
  const sendmessage = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(api2, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(form),
      });
      console.log(form);
      socket.emit("sendmessage",form);
      setmessage((prevMessages) =>
        Array.isArray(prevMessages) ? [...prevMessages, form] : [form]
      );
      setform((prev) => ({ ...prev, message: "" }));
      //  setmessage(prev => [...prev,form.message]);
      setform({ name:"", message:"", complaintId:"" });
      socket.emit("adminmsg",{userid:form.name,text:form.message,username:username});
      // setmessage("");
      console.log("notify",notify);
  displaychat(form.complaintId);
    } catch (err) {
      console.log(err);
    }
  };
  const usercomplaint = async () => {
    // e.preventDefault();
    try {
      const res = await fetch(api, {
        method: "GET",
      });
      const data = await res.json();
      setcomplaint(data.data);
      console.log(data.data._id);
      // setform(prev =>({...prev,id:data.data._id}));
      console.log(complaints);
    } catch (err) {
      console.log(err);
    }
  };

  const displaychat = async (d) => {
    try {
      setid(d);
      const res = await fetch(api3, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ complaintId: d }),
      });
      console.log(d);
      const data1 = await res.json();
      console.log(data1);
      // console.dir(data1.data.name+"user");
      let message = Array.isArray(data1.data) ? data1.data : [data1.data];
      setmessage(message);
      console.log(message1);
      // console.log(message);
    } catch (err) {
      console.log(err);
    }
  };
  const changestatus=async (id)=>{
    // e.preventDefault();

    try{
      const res = await fetch(api4, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ complaintId: id, status: "Completed" }),
      });
      console.log(id);
      const data = await res.json();
      console.log(data);
      if (data.message === "Status updated successfully") {
        alert("Status updated to successfully");
        setcomplaint((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === id
            ? { ...complaint, status: "Completed" }
            : complaint
        )
      );
      } else {
        alert("Failed to update status");
      }
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    usercomplaint();
  }, []);

  useEffect(()=>{
    socket.emit("joinadmin");
    socket.on("newmsgfromuser",(msg)=>{
      setnotify(msg);
     setTimeout(()=>setnotify(null),5000);
    });
    return()=>socket.off("newmsgfromuser");
    },[])

  // document.getElementById("message").addEventListener("click",()=>{
  //           document.getElementById("reply").style.display="block";
  //  }
  //  )
   const back = () => {
    window.location.reload();
  };

 
  const [open,setopen]=useState(false);
  const [page, setpage] = useState("admin");
  const [form, setform] = useState({
    name: "",
    message: " ",
    complaintId: " ",
    sender: "admin",
  });
  const [complaints, setcomplaint] = useState([]);
  const [isopen, setisopen] = useState("");
  const [id, setid] = useState({ complaintId: "" });
  const [message1, setmessage] = useState([]);
  const [notify,setnotify]=useState(null);

   const openstats=()=>{
    setpage("stats");
  }
  return (
    <>
      {page === "admin" && (
        <>
          <nav id="complaintnav">
            <h3>Hello,{username}</h3>
            <button onClick={back}>Log Out</button>
            <button onClick={openstats} >complaintstats</button> 
          </nav>
          <section id="status2">
            <div id="status1">
              <div id="cards">
                {complaints.map((item) => (
                  <div className="card" key={item.id}>
                    <table>
                      <tr>
                        <td className="title">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s "
                            width="30px"
                            height="30px"
                          />
                        </td>
                        <td>: {item.name}</td>
                      </tr>
                      <tr>
                        <td className="title">
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/4942/4942069.png "
                            width="30px"
                            height="30px"
                          />
                        </td>
                        <td>: {item.address}</td>
                      </tr>
                      <tr>
                        <td className="title">
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/2451/2451474.png "
                            width="40px"
                            height="40px"
                          />
                        </td>
                        <td>: {item.city}</td>
                      </tr>
                      <tr>
                        <td className="title">
                          <img
                            src="https://e7.pngegg.com/pngimages/647/766/png-clipart-state-government-computer-icons-others-miscellaneous-blue-thumbnail.png"
                            width="30px"
                            height="30px"
                          />
                        </td>
                        <td>: {item.state}</td>
                      </tr>
                      <tr>
                        <td className="title">
                          <img
                            src="https://png.pngtree.com/png-clipart/20220521/ourmid/pngtree-red-location-icon-sign-png-image_4644037.png "
                            width="30px"
                            height="30px"
                          />
                        </td>
                        <td>: {item.pincode}</td>
                      </tr>
                      <tr>
                        <td className="title">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwoLK8Utu4B1ZsfE5X0N7CgOLwRgThRnWa9g&s "
                            width="30px"
                            height="30px"
                          />
                        </td>
                        <td id="complaintwidth">: {item.description}</td>
                      </tr>
                          
                      <tr>
                        <td className="title">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwoLK8Utu4B1ZsfE5X0N7CgOLwRgThRnWa9g&s "
                            width="30px"
                            height="30px"
                          />
                        </td>
                       <td  className="imagewidth"><img  src={`data:${item.image.contentType};base64,${btoa(
      new Uint8Array(item.image.data.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    )}`}onClick={()=>setopen(true)}/></td></tr>

    {open && (<Lightbox mainSrc={`data:${item.image.contentType};base64,${btoa(
      new Uint8Array(item.image.data.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    )}`} onCloseRequest={()=> setopen(false)} />)}
                      
                              
                      <tr>
                        <td className="title">Status</td>
                        <td> 
                          <button style={{
        backgroundColor: item.status === "Completed" ? "yellow" : "blue",
        color: item.status === "Completed" ? "blue" : "yellow",
        fontWeight: "lighter",
        border: "none",
        padding: "5px 10px",
        borderRadius: "15px",
          }}>{item.status}</button>
                        </td>
                      </tr>

                      <tr>
                        <td colSpan="2">
                          <button
                            className="message"
                            onClick={(e) => {
                              if(isopen === item._id){
                                setisopen(null);
                                }
                                else{
                                 setisopen(item._id);
                              setform({
                                ...form,
                                name: item.name,
                                complaintId: item._id,
                                sender: "admin",
                              });
                              //  {setid({complaintId:item._id})}
                                displaychat(item._id);
                                setnotify(null);
                            }
                            }}
                          >
                            
                           💬 message
                          </button>
                        </td>
                      </tr>
                      {isopen === item._id && (
                        <tr>
                          <td colSpan="2">
                            <div className="chatwindow">
                              {Array.isArray(message1) ? (
                                message1.map((msg, index) => (
                                  <div
                                    key={index}>
                                    {Array.isArray(msg.message) ? (
                                      msg.message.map((line, i) => (
                                        <p key={i} className={
                                           line.sender === "user" ? "user" : "admin" }>
                                          <strong>
                                            {line.sender === "admin"
                                              ? username
                                              : msg.name}
                                          </strong>
                                          :{line.text}
                                         
                                        </p>
                                          
                                      ))
                                     
                                    ) : (
                                      <p>{msg.message}</p>
      
                                    )
                                     
                                    }
                                    
                                  </div>
                                ))
                               
                              ) : (
                                <p>Loading messages ...</p>
                              )}
                            </div>

                            <div id="reply">
                              <form onSubmit={sendmessage}>
                                {/* <input type="hidden" name="name"/>   */}
                                <input
                                  type="text"
                                  name="message"
                                  placeholder="type message"
                                  onChange={(e) => {
                                    setform({
                                      ...form,
                                      [e.target.name]: e.target.value,
                                    });
                                  }}
                                />
                                {/* <input type="hidden" name="complaintId" onChange={(e)=>{setform({...form,[e.target.name]:item._id});}}/> */}
                                <button id="send">
                                  <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdzson5nnt3at2eH9CcsLIxLl5o_ZCvhXkkg&s"
                                    width="30px"
                                    height="30px"
                                  />
                                </button>
                              </form>
                            </div>
                            <div>
                            <tr><td colSpan="2"><button  className="message" onClick={()=>{ changestatus(item._id);}}>✅ Mark as completed </button></td></tr>

                              </div>
                          </td>
                        </tr>
                                 

                      )}

                    </table>
                  </div>
                )) }
                 {
                  notify && <div className="notification">
                    <h4>New Message  {notify.from}</h4>
                  <p>{notify.username}<small> :{notify.text}</small></p>  
                    </div>
                 }
              </div>
            </div>
          </section>
        </>
      )}
      {page ==="stats" && <Stats />}
    </>
    
  )
}


{
  /* location:https://png.pngtree.com/png-clipart/20220521/ourmid/pngtree-red-location-icon-sign-png-image_4644037.png */
}
{
  /* name:https://icon-library.com/images/name-icon-png/name-icon-png-2.jpg */
}
{
  /* city:https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmEsObXplzefCmUusu6IerwC6ZXXnytvOpFQ&s */
}
{
  /* state:https://e7.pngegg.com/pngimages/647/766/png-clipart-state-government-computer-icons-others-miscellaneous-blue-thumbnail.png */
}
{
  /* complaint : https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwoLK8Utu4B1ZsfE5X0N7CgOLwRgThRnWa9g&s */
}

