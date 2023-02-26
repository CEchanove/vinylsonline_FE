import './footer.scss';
import Logo from '../images/logo.webp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function Footer() {
    
    return (
        <footer>
        <div className="footerColumn">
          <img src={Logo} alt="logo" />
        </div>
        <div className="footerColumn">
          <h5>Where are we?</h5>
          <p>Address line 1</p>
          <p>Postcode</p>
          <p>City</p>
        </div>
        <div className="footerColumn">
          <h5>Follow Us</h5>
          <div className="icons">
            <FacebookIcon sx={{color: '#fff'}} fontSize="large"/>
            <InstagramIcon sx={{color: '#fff'}} fontSize="large"/>
            <PinterestIcon sx={{color: '#fff'}} fontSize="large"/>
          </div>
          <div className="icons">
            <TwitterIcon sx={{color: '#fff'}} fontSize="large"/>
            <YouTubeIcon sx={{color: '#fff'}} fontSize="large"/>
          </div>
        </div>
      </footer>  
    )
}