import { useState } from "react";
import axios from "axios";
import "./App.css";

const backendURL = "https://alumni-association-network.onrender.com";

export default function Register() {
  const [form, setForm] = useState({
    full_name:"",
    email:"",
    username:"",
    password:"",
    confirm:""
  });

  const submit = async () => {
    if(!form.full_name || !form.email || !form.username || !form.password || !form.confirm){
      alert("All fields must be filled");
      return;
    }
    if(form.password !== form.confirm){
      alert("Passwords do not match");
      return;
    }

    try{
      await axios.post(`${backendURL}/api/auth/register`,{
        full_name:form.full_name,
        email:form.email,
        username:form.username,
        password:form.password
      });
      alert("✅ Registered Successfully!");
      setForm({ full_name:"", email:"", username:"", password:"", confirm:"" });
    }catch(err){
      alert(err.response?.data?.msg || "Registration Failed");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Alumni Association Registration</h2>

        <input placeholder="Full Name"
          value={form.full_name}
          onChange={e=>setForm({...form,full_name:e.target.value})}
        />
        <input placeholder="Email"
          value={form.email}
          onChange={e=>setForm({...form,email:e.target.value})}
        />
        <input placeholder="Username"
          value={form.username}
          onChange={e=>setForm({...form,username:e.target.value})}
        />
        <input placeholder="Password" type="password"
          value={form.password}
          onChange={e=>setForm({...form,password:e.target.value})}
        />
        <input placeholder="Confirm Password" type="password"
          value={form.confirm}
          onChange={e=>setForm({...form,confirm:e.target.value})}
        />

        <button onClick={submit}>Create Account</button>

        <p className="text-center">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
