import { useState } from "react";
import axios from "axios";
import "./App.css";

const backendURL = "https://alumni-association-network.onrender.com";

export default function Login(){
  const [loginid,setLoginid] = useState("");
  const [password,setPassword] = useState("");

  const submit = async ()=>{
    if(!loginid || !password){
      alert("All fields are required");
      return;
    }

    try{
      await axios.post(`${backendURL}/api/auth/login`,{ loginid,password });
      alert("✅ Login Successful!");
    }catch(err){
      alert(err.response?.data?.msg || "Login Failed");
    }
  };

  return(
    <div className="container">
      <div className="card">
        <h2>Alumni Association Login</h2>

        <input
          placeholder="Username or Email"
          onChange={e=>setLoginid(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          onChange={e=>setPassword(e.target.value)}
        />

        <button onClick={submit}>Login</button>

        <p className="text-center">
          Not a user? <a href="/Register">Register Here</a>
        </p>
      </div>
    </div>
  )
}
