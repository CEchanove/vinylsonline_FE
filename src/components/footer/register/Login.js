import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./register.scss";
import axios from "axios";
import Nav from "../../nav/Nav";
import Footer from "../Footer";

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
      const queryParams = new URLSearchParams(window.location.search)
      const newUser = queryParams.get("user")

      if (newUser){
        setEmail(newUser)
      }
    },[])

    const handleLogin = (e) =>{
        e.preventDefault()
        let data = {
            email: email,
            password: password,
        }
        axios.post("http://localhost:3999/login", data)
        .then((res) => {
            navigate(`/user-area?id=${res.data.id}`)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <main className="registration">
          <Nav />
          <h1>Login to your account</h1>
          <form onSubmit={handleLogin}>
            <div className="form__row">
              <label>Email:</label>
              <input type="text" onChange={(e) => setEmail(e.target.value)} value={email}/>
            </div>
            <div className="form__row">
              <label>Password:</label>
              <input type="password"  onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <input type="submit" value="Login"/>
          </form>
          <Footer />
        </main>
      );
}