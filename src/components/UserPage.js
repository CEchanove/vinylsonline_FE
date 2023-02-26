import { useState, useEffect } from "react";
import "./styles.scss";
import axios from "axios";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import Button from "@mui/material/Button";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import Alert from "@mui/material/Alert";
import Albums from "./albums/Albums";
import Nav from "./nav/Nav";
import Footer from "./footer/Footer";
import SearchIcon from "@mui/icons-material/Search";

export default function UserPage() {
  const [id, setId] = useState(0);
  const [sellItems, setSellItems] = useState(false);
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [info, setInfo] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [reload, setReload] = useState(false);
  const [message, setMessage] = useState("");
  const [messageAlert, setMessageAlert] = useState(false);
  const [userName, setUserName] = useState("");
  const [albums, setAlbums] = useState([]);
  const [author, setAuthor] = useState("");
  const [search, setSearch] = useState("");
  const [incorrectAlert, setIncorrectAlert] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const userId = queryParams.get("id");
    setId(userId);

    //get the username to display at the top of the page
    axios
      .get(`http://localhost:3999/users/${userId}`)
      .then((res) => {
        // console.log(res.data);
        setUserName(res.data.name);
      })
      .catch((err) => {
        console.log(err);
      });

    //get all albums for one user
    axios
      .get(`http://localhost:3999/users/getVinyls/${userId}`)
      .then((res) => {
        setAlbums(res.data.albums);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reload]);

  const rel = () => {
    setReload(!reload);
  };

  //adds album for the logged in user
  const saleVinyl = () => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(image);
    fileReader.onload = () => {
      let data = {
        name: name,
        author: author,
        genre: genre,
        info: info,
        price: price,
        image: fileReader.result,
        user: id,
      };

      axios
        .post("http://localhost:3999/users/addVinyl", data)
        .then((res) => {
          rel();
          setSellItems(!sellItems);
        })
        .catch((err) => {
          console.log(err);
          setMessage("Something went wrong, please try again");
          setMessageAlert(true);
          setTimeout(() => {
            setMessageAlert(false);
          }, 3000);
        });
    };
  };

  const handleSearch = () => {
    const data = {
      search: search,
    };
    const regex = /^[a-zA-Z]+$/;
    if (search === "") {
      //returns only the users vinyls
      axios
        .get(`http://localhost:3999/users/getVinyls/${id}`)
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
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
  };

  return (
    <main className="user__page">
      <Nav />
      {incorrectAlert ? <Alert severity="warning">{message}</Alert> : <></>}
      <div className="search__row">
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

        <h1>
          Hello <span>{userName}</span>
        </h1>
      </div>
      <section className="add__vinyl">
        <h2>Add vinyls for sale</h2>
        {sellItems === false ? (
          <AddCircleIcon
            onClick={() => setSellItems(!sellItems)}
            className="add__icon"
            color="error"
          />
        ) : (
          <DoNotDisturbOnIcon
            onClick={() => setSellItems(!sellItems)}
            className="add__icon"
            color="error"
          />
        )}
        {sellItems ? (
          <section className="sell__items">
            {messageAlert ? <Alert severity="warning">{message}</Alert> : <></>}

            <h3>New Vinyl for sale?</h3>
            <div className="item__row">
              <p>Album Name:</p>
              <input
                type="text"
                max={50}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="item__row">
              <p>Author:</p>
              <input
                type="text"
                max={20}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="item__row">
              <p>Select genre:</p>
              <select onChange={(e) => setGenre(e.target.value)}>
                <option>--Select Genre--</option>
                <option>Classic</option>
                <option>Pop</option>
                <option>Rock</option>
                <option>Metal</option>
              </select>
            </div>
            <div className="item__row">
              <p>More about this Album:</p>
              <textarea
                cols={20}
                rows={4}
                max={120}
                onChange={(e) => setInfo(e.target.value)}
              />
            </div>
            <div className="item__row">
              <p>Price:</p>
              <input type="number" onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="item__row">
              <p>Upload Image</p>
              <input
                type="file"
                accepts="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <Button
              variant="outlined"
              startIcon={<PointOfSaleIcon />}
              color="error"
              onClick={() => saleVinyl()}
            >
              Sale
            </Button>
          </section>
        ) : (
          <></>
        )}
      </section>
      <section className="add__vinyl">
        <h2>Your Listed Vinyls</h2>
        {albums.length > 0 ? (
          <Albums albums={albums} rel={rel} id={id} />
        ) : (
          <h3 style={{ color: "#ec3b3b" }}>You have no albums to sale</h3>
        )}
      </section>
      <Footer />
    </main>
  );
}
