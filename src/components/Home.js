import "./styles.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Albums from "./albums/Albums";
import Nav from "./nav/Nav";
import Footer from "./footer/Footer";
import SearchIcon from '@mui/icons-material/Search';
import Alert from "@mui/material/Alert";


export default function Home() {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);
  const [search, setSearch] = useState("")
  const [incorrectAlert, setIncorrectAlert] = useState(false);
  const [message, setMessage] = useState("");



  //onload get las 12 albums
  useEffect(() => {
    axios
      .get("http://localhost:3999/general")
      .then((res) => {
        setAlbums(res.data.albums);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSearch = () => {
    const data = {
      search: search,
    };
    const regex = /^[a-zA-Z]+$/;
    if (search === "") {
      //returns only the last 12 vinyls
      axios
      .get("http://localhost:3999/general")
      .then((res) => {
        setAlbums(res.data.albums);
      })
      .catch((err) => {
        console.log(err);
      });
    } else if (!search.match(regex)) {
      //FE SQL injection check
      setMessage("You can only search words with only letters");
      setIncorrectAlert(true);
      setTimeout(() => {
        setIncorrectAlert(false);
      }, 2500);
    } else {
      axios
        .post("http://localhost:3999/general/search", data)
        .then((res) => {
          setAlbums(res.data);
          setSearch("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13){
      handleSearch()
    }
  }

  return (
    <main className="home">
      <Nav />
      <section className="home__row">
      {incorrectAlert ? <Alert severity="warning">{message}</Alert> : <></>}
        <div className="search">
          <input
            type="text"
            className="searchBar"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <SearchIcon
            sx={{ color: "#ec3b3b" }}
            fontSize="large"
            onClick={() => handleSearch()}
          />
        </div>
        <section className="login">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </section>
      </section>
      <section className="intro">
        <h1>Welcome to vinyls online</h1>
        <h2>
          We are a Scottish based online mail order vinyl record shop and also a
          bricks and mortar high street shop in the centre of Wishaw.
          <br />
          We have an extensive stock of 7" singles, LPs, 12" singles, limited
          editions, picture discs and imports.
        </h2>
      </section>
      <section className="latest">
        <h3>Browse through our latest albums</h3>
        <div className="row">
          <Albums albums={albums} />
        </div>
      </section>
      <Footer />
    </main>
  );
}
