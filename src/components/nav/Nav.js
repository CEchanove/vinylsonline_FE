import Logo from '../images/logo.webp';
import './nav.scss'
import { useNavigate } from 'react-router-dom';

export default function Nav() {
  const navigate = useNavigate()
    return(
    <nav>
    <img src={Logo} alt="Logo" onClick={() => navigate("/")}/>
    <div id="navigation">
      <h4 onClick={() => navigate("/")}>Latest</h4>
      <h4 href="#">Trending</h4>
      <h4 href="#">Albums</h4>
      <h4 href="#">Singles</h4>
    </div>
  </nav>)

}