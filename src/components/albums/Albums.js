import { useState, useEffect } from "react";
import "./albums.scss";
import Modal from "@mui/material/Modal";
import InfoModal from "./InfoModal";
import axios from "axios";
import Alert from "@mui/material/Alert";
import EditModal from "./EditModal";

export default function Albums(props) {
  const [albums, setAlbums] = useState([]);
  const [info, setInfo] = useState("");
  const [message, setMessage] = useState("");
  const [messageAlert, setMessageAlert] = useState(false);
  const [edit, setEdit] = useState([])

  //opens modal
  const [open, setOpen] = useState(false);
  const handleOpen = (info) => {
    setInfo(info);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = (album) => {
    setEdit(album);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => setOpenEdit(false);


  useEffect(() => {
    setAlbums(props.albums);
  }, [props]);

  //Deletes the album if the user clicks on delete
  const handleDelete = (id) => {
    axios
      .get(`http://localhost:3999/users/deleteVinyl/${id}`)
      .then((res) => {
        //reloads the page
        props.rel();
      })
      .catch((err) => {
        //alerts user that there is an error
        setMessage("Something went wrong, please try again");
        setMessageAlert(true);
        setTimeout(() => {
          setMessageAlert(false);
        }, 2500);
      });
  };

  const handleEdit = () => {

  }

  return (
    <main className="albums">
      {messageAlert ? <Alert severity="warning">{message}</Alert> : <></>}
      {albums.map(function (d, i) {
        return (
          <section className="album">
            <img src={d.image} alt="album cover" />
            <strong>{d.title}</strong>
            <i>{d.author}</i>
            <p>£{parseFloat(d.price).toFixed(2)}</p>
              {d.userId == props.id ? (
                <div className="albumBtns">
                  <button
                    className="infoBtn"
                    onClick={() => handleOpenEdit(d)}
                  >
                    Edit
                  </button>
                  <button className="buyBtn" onClick={() => handleDelete(d.id)}>
                    Delete
                  </button>
                </div>
              ) : (
                <div className="albumBtns">
                  <button
                    className="infoBtn"
                    onClick={() => handleOpen(d.info)}
                  >
                    Info
                  </button>
                  <button className="buyBtn">Buy</button>
                </div>
              )}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <InfoModal info={info} />
            </Modal>
            <Modal
              open={openEdit}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <EditModal handleClose={handleCloseEdit} album={edit} rel={props.rel}/>
            </Modal>

          </section>
        );
      })}
    </main>
  );
}
