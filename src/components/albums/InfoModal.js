import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useState, useEffect} from 'react';

//modal styles
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50vw",
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: "1rem",
    boxShadow: 24,
    p: 4,
  };

export default function InfoModal(props){
    const [info, setInfo] = useState("")

    useEffect(() => {
      setInfo(props.info)
    },[props])

    return(
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Album Info:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {info}
          </Typography>
        </Box>
    )
}