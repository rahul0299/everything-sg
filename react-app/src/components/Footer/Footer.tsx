import { Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons'
import './Footer.css'

const Footer = () => {
  return (
    <footer className='footer-container'>
      <div className='footer-content'>
        {/* Columns will now appear side by side */}

        <div className='footer-section'>
          <h3>Quick Links</h3>
          <ul>
            <Link to='/'>Home</Link>
            <br></br>
            <Link to='/movies'>Movies</Link>
            <br></br>
            <Link to='/attractions'>Attractions</Link>
            <br></br>
            <Link to='/events'>Events</Link>
            <br></br>
            <Link to='/dining'>Dining</Link>
          </ul>
        </div>

        <div className='footer-section'>
          <h3>Contact</h3>
          <p>Email: info@EverythingSG.com</p>
          <p>Phone: (123) 456-7890</p>
          <p>Address: 123 Tourism Street</p>
        </div>

        <div className='footer-section'>
          <h3>Follow Us</h3>
          <div className='social-icons'>
            <a
              href='https://facebook.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href='www.twitter.com' target='_blank' rel='noopener noreferrer'>
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              href='https://instagram.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
      </div>

      <div className='footer-bottom'>
        <p>&copy; {new Date().getFullYear()} EverythingSG</p>
      </div>
    </footer>
  )
}

export default Footer
