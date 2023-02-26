import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.scss";
import axios from "axios";
import Alert from '@mui/material/Alert';
import Nav from "../../nav/Nav";
import Footer from "../Footer";

export default function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passCheck, setPassCheck] = useState("");
  const [message, setMessage] = useState("")
  const [messageAlert, setMessageAlert] = useState(false)
  const navigate = useNavigate()

  const handleRegistration = (e) => {
    e.preventDefault();
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (password != passCheck){
        alert("passwords don't match")
    }
    if (!email.match(emailRegex)){
        alert("incorrect email format")
    } if (name === "" || surname === "" || email === "" || password === ""){
        alert("All fields must be filled")
    } else {
        try {
            let data = {
                name: name,
                surname: surname,
                email: email,
                password: password,
            }
            axios.post("http://localhost:3999/login/register", data)
            .then((res) => {
                console.log(res)
              navigate(`/login?user=${email}`)
            }).catch((err) => {
                // console.log(err.response.data.msg)
                setMessage(err.response.data.msg)
                setMessageAlert(true)
                setTimeout(() => {
                  setMessageAlert(false)
                },2500)
            })     
        } catch (err) {
            console.log(err.respose.data.msg)
        }
    }
  };
  return (
    <main className="registration">
      <Nav />
      <h1>Register a new user</h1>
      {messageAlert ? (
        <Alert severity="warning">{message}</Alert>
      ):(
        <></>
      )}
      <form onSubmit={handleRegistration}>
        <div className="form__row">
          <label>Name:</label>
          <input type="text" onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className="form__row">
          <label>Surname:</label>
          <input type="text" onChange={(e) => setSurname(e.target.value)}/>
        </div>
        <div className="form__row">
          <label>email:</label>
          <input type="text" onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="form__row">
          <label>Password:</label>
          <input type="password"  onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="form__row">
          <label>Re-Type password:</label>
          <input type="password" onChange={(e) => setPassCheck(e.target.value)}/>
        </div>
        <input type="submit" value="Register"/>
      </form>
      <Footer/>
    </main>
  );
}
