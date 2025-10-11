import "./sign.css";
import {io} from "socket.io-client";
import { useState, useEffect } from "react";
import Complaintpage from "./complaintpage.jsx";
export default function Status({ username }) {
  const socket=io(import.meta.env.VITE_API_URL,{
    transports:["websocket"],
    reconnection:true,
    reconnectionAttempts:10,
    reconnectionDelay:1000
  });
  const BASE_URL = import.meta.env.VITE_API_URL;

const api  = `${BASE_URL}/api/dataretrieve`;

  const addcards = async () => {
    //  e.preventDefault();
    try {
      const res = await fetch(api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      // localStorage.setItem(data.data);
      setcomplaint(data.data);
      console.log(complaint);
    } catch (err) {
      console.log(err);
    }
  };
  const api2 = `${BASE_URL}/api/adminreply`;
  const api3 = `${BASE_URL}/api/dataretreive`;

  const sendmessage = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(api2, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(form),
      });
      console.log(form);
      setmessage((prevMessages) =>
        Array.isArray(prevMessages) ? [...prevMessages, form] : [form]
      );
      console.log(message1);
      setform((prev) => ({ ...prev, message: "" }));
      //  setmessage(prev => [...prev,form.message]);
      setform({ name: " ", message: " ", complaintId: " " });
      socket.emit("usermessage",{userid:form.complaintId,text:form.message,username:username});
    console.log("notify",notify);
      displaychat(form.complaintId);
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
      // console.log(d);
      const data1 = await res.json();
      // console.log(data1);
      // console.dir(data1.data.name+"user");
      let message = Array.isArray(data1.data) ? data1.data : [data1.data];
      setmessage(message);
    

    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    addcards();
  }, []);
  useEffect(()=>{
    socket.emit("joinuser",username);
    socket.on("newmessagefromadmin",(msg)=>{
      setnotify(msg);
      setTimeout(()=>setnotify(null),5000);
    })
      return()=>socket.off("newmessagefromadmin");
  },[username])
  const back = () => {
    window.location.reload();
  };

  const complaintpage = () => {
    setpage("complaintpage");
  };

  const [page, setpage] = useState("status");
  const[notify,setnotify]=useState(null);
  const [complaint, setcomplaint] = useState([]);
  const [isopen, setisopen] = useState(false);
  const [openchat,setopenchat]=useState(null);
  const [message1, setmessage] = useState([]);
  const [id, setid] = useState("");

 const [form,setform]=useState({name:'',message:'',complaintId:'',sender:'user'});
  const user = { username };

  console.log(complaint);
  return (
    <>
      {page === "status" && (
        <>
          <nav id="complaintnav">
            <h3>Hello,{username}</h3>
            {/* <button id="reg">Register complaint</button> */}
            <button id="status" onClick={complaintpage}>
              🗄 New Complaint 
            </button>
            <button onClick={back}>🔒 Log out</button>
          </nav>
          <section id="status2">
            <div id="status1">
              <div id="cards">
                   {complaint.map((item)=>(
                  <div className="card" key={item.id}>
                    <table>
                      <tr>
                        <td className="title"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s " width="30px" height="30px" /></td>
                        <td>: {item.name}</td>
                      </tr>
                      <tr>
                        <td className="title"><img src="https://cdn-icons-png.flaticon.com/512/4942/4942069.png " width="30px" height="30px" /></td>
                        <td>: {item.address}</td>
                      </tr>
                      <tr>
                        <td className="title"><img src="https://cdn-icons-png.flaticon.com/512/2451/2451474.png " width="40px" height="40px" /></td>
                        <td>: {item.city}</td>
                      </tr>
                      <tr>
                        <td className="title"><img src="https://e7.pngegg.com/pngimages/647/766/png-clipart-state-government-computer-icons-others-miscellaneous-blue-thumbnail.png" width="30px" height="30px" /></td>
                        <td>: {item.state}</td>
                      </tr>
                      <tr>
                        <td className="title"><img src="https://png.pngtree.com/png-clipart/20220521/ourmid/pngtree-red-location-icon-sign-png-image_4644037.png " width="30px" height="30px" /></td>
                        <td>: {item.pincode}</td>
                      </tr>
                      <tr>
                        <td className="title"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwoLK8Utu4B1ZsfE5X0N7CgOLwRgThRnWa9g&s " width="30px" height="30px" /></td>
                        <td id="complaintwidth">: {item.description}</td>
                      </tr>
                      <tr>
                        <td className="title"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwoLK8Utu4B1ZsfE5X0N7CgOLwRgThRnWa9g&s " width="30px" height="30px" /></td>
                        <td  className="imagewidth"><img  src={`data:${item.image.contentType};base64,${btoa(
      new Uint8Array(item.image.data.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    )}`} /></td>  </tr>
                      <tr> 
                        <td className="title">Status</td>
                        <td>
                        <button>{item.status}</button>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                          <button
                            className="message"
                            onClick={(e) => {
                              if(openchat === item._id){
                                setopenchat(null);
                                }
                                else{
                              // setisopen(item._id);
                              setform({
                                ...form,
                                name: item.name,
                                complaintId: item._id,
                                sender: "user",
                              });
                              //  {setid({complaintId:item._id})}
                              setopenchat(item._id);
                                displaychat(item._id);
                            }
                            }}
                          >
                            message
                          </button>
                        </td>
                      </tr>
                      {openchat === item._id && (
                        <tr>
                          <td colSpan="2">
                            <div className="chatwindow">
                            {Array.isArray(message1) ? (
                                message1.map((msg, index) => (
                                  <div
                                    key={index}
                                    
                                  >
                                    {Array.isArray(msg.message) ? (
                                      
                                      msg.message.map((line, i) => (
                                        <p key={i} className={
                                      line.sender === "user" ? "user" : "admin"
                                    }>
                                           <strong>
                                            {line.sender === "admin"
                                              ? "Admin"
                                              : msg.name}
                                          </strong>
                                          :
                                          {line.text}
                                        </p>
                                      ))
                                    ) : (
                                      <p>{msg.message}</p>
                                    )}
                                  </div>
                                ))
                              ) : (
                                <p>Loading messages ...</p>
                              )} 
                              {/* {Array.isArray(message1) ? (
  message1.map((msg, index) => (
    <p key={index} className={msg.sender === "user" ? "user" : "admin"}>
      <strong>{msg.sender === "admin" ? "Admin" : msg.name}</strong>: {msg.text}
    </p>
  ))
) : (
  <p>Loading messages ...</p>
)} */}
                              
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
                                  // https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdzson5nnt3at2eH9CcsLIxLl5o_ZCvhXkkg&s"
                                    // src="https://cdn0.iconfinder.com/data/icons/flat-ui-5/64/send-chat-message-512.png"
                                  // src="https://e7.pngegg.com/pngimages/444/562/png-clipart-united-states-small-business-hotel-organization-send-button-angle-rectangle.png"
                                  src="https://i.redd.it/w39kucuqzvwc1.jpeg"  
                                  width="30px"
                                    height="30px"
                                  />
                                </button>
                              </form>
                            </div>
                          </td>
                        </tr>
                      )}
                    </table>
                  </div>
                ))}
                {
                  notify && <div className="notification">
                    <h4>Message from {notify.from}</h4>
                    <p>{notify.username} : <small>{notify.text}</small></p>
                  </div>
                }
              </div>
            </div>
          </section>
        </>
      )}
      {
       page === "complaintpage" && <Complaintpage username={username} />}
    </>
  )
}
   







