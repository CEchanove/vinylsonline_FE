import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import axios from 'axios';
import Alert from "@mui/material/Alert";


//modal styles
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60vw",
  height: "50vh",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "1rem",
  boxShadow: 24,
  p: 4,
};

export default function EditModal(props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [info, setInfo] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [messageAlert, setMessageAlert] = useState(false);

  useEffect(() => {
    console.log(props.album);
    setTitle(props.album.title);
    setAuthor(props.album.author);
    setInfo(props.album.info);
    setPrice(props.album.price);
    setGenre(props.album.genre)
  }, [props]);

  const handleEdit = () => {
    let data = {
        title: title,
        author: author,
        genre: genre,
        info: info,
        price: price,
        id: props.album.id
    }
    axios.post("http://localhost:3999/general/edit", data)
    .then((res) => {
        props.rel()
        props.handleClose()
    }).catch((err) => {
        setMessage("Something went wrong, please try again")
        setMessageAlert(true)
        setTimeout(() => {
            setMessageAlert(false)
        },2500)
    })
  }

  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Edit Your album:
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <section className="info__modal">
        {messageAlert ? <Alert severity="warning">{message}</Alert> : <></>}

          <div className="modal__row">
            <p>Name:</p>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="modal__row">
            <p>Author:</p>
            <input
              type="text"
              onChange={(e) => setAuthor(e.target.value)}
              value={author}
            />
          </div>
          <div className="modal__row">
            <p>Genre:</p>
            <select onChange={(e) => setGenre(e.target.value)} id="select_modal" value={genre}>
              <option>--Select Genre--</option>
              <option value="Classic">Classic</option>
              <option value="Pop">Pop</option>
              <option value="Rock">Rock</option>
              <option value="Metal">Metal</option>
            </select>
          </div>
          <div className="modal__row">
            <p>Info:</p>
            <textarea cols={20} rows={3}
              type="text"
              onChange={(e) => setInfo(e.target.value)}
              value={info}
            />
          </div>
          <div className="modal__row">
            <p>Price:</p>
            <input
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>
          <div className="buttons__row">
            <Button option="contained" color="success" onClick={() => handleEdit()}>
                Send
            </Button>
            <Button option="outlined" color="error" onClick={() => props.handleClose()}>
                Cancel
            </Button>
          </div>
        </section>
      </Typography>
    </Box>
  );
}
