import { Link } from 'react-router'
import './homepage.css'

const HomePage = () => {
  return (
    <div className='landing-page'>
      {/* Netflix-style Top Section */}
      <section className='top-hero'>
        <div className='overlay' />
        <div className='top-content'>
          <h1 className='hero-title'>EverythingSG</h1>
          <p className='hero-subtitle'>
            Discover the best of Singapore — food, fun, and unforgettable
            experiences.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className='features-section'>
        <h2 className='features-heading'>FEATURES</h2>
        <div className='features-grid'>
          <Link to='/movies' className='feature-box'>
            <div className='feature-icon-container'>
              <img
                src='https://img.icons8.com/?size=100&id=97192&format=png&color=000000'
                alt='Movies'
                className='feature-img'
              />
            </div>
            <h3 className='feature-title'>Movies</h3>
            <p className='feature-desc'>
              Dive into blockbusters, indie gems, and timeless classics lighting
              up screens near you.
            </p>
          </Link>

          <Link to='/events' className='feature-box'>
            <div className='feature-icon-container'>
              <img
                src='https://img.icons8.com/?size=100&id=uwS5rVi2Z61i&format=png&color=000000'
                alt='Events'
                className='feature-img'
              />
            </div>
            <h3 className='feature-title'>Events</h3>
            <p className='feature-desc'>
              Experience live music, festivals, and can't-miss happenings that
              bring the city to life.
            </p>
          </Link>

          <Link to='/attractions' className='feature-box'>
            <div className='feature-icon-container'>
              <img
                src='https://cdn-icons-png.flaticon.com/512/854/854894.png'
                alt='Attractions'
                className='feature-img'
              />
            </div>
            <h3 className='feature-title'>Attractions</h3>
            <p className='feature-desc'>
              Uncover hidden landmarks, iconic wonders, and breathtaking spots
              worth the journey.
            </p>
          </Link>

          <Link to='/dining' className='feature-box'>
            <div className='feature-icon-container'>
              <img
                src='https://cdn-icons-png.flaticon.com/512/3075/3075977.png'
                alt='Dining'
                className='feature-img'
              />
            </div>
            <h3 className='feature-title'>Dining</h3>
            <p className='feature-desc'>
              Savor culinary adventures, from cozy cafés to gourmet hotspots
              that redefine flavor.
            </p>
          </Link>
        </div>
      </section>

      {/* About Us Section */}
      <section className='about-us'>
        <div className='about-us-container'>
          <div className='about-us-image'>
            <img
              src='https://cdn.pixabay.com/photo/2021/11/22/20/32/nature-6817376_1280.jpg'
              alt='About Us'
              className='about-us-img'
            />
          </div>
          <div className='about-us-text'>
            <h2>About Us</h2>
            <p className='about-us-desc'>
              " Welcome to Everything SG – your ultimate all-in-one gateway to
              the best of Singapore! Whether you're craving blockbuster movies,
              unforgettable dining experiences, must-see attractions, or
              thrilling events, we've got it all seamlessly curated in one
              place. No more juggling multiple apps or websites – with
              Everything SG, you can effortlessly discover, book, and dive into
              the vibrant heartbeat of the city. From hidden culinary gems to
              iconic landmarks, sold-out concerts to the latest cinema releases,
              we’re here to make every moment count. Explore more, plan smarter,
              and experience Singapore like never before! ✨🇸🇬"
            </p>
            <h3>Why Choose Us?</h3>
            <ul className='about-us-list'>
              <li>
                All-in-One Convenience – Book movies, dining, attractions, and
                events in one app—no more switching between multiple platforms!
              </li>
              <li>
                Exclusive Deals & Offers – Get special discounts, early-bird
                tickets, and members-only perks you won’t find elsewhere.
              </li>
              <li>
                Real-Time Availability – Instant updates on showtimes,
                restaurant slots, and event tickets so you never miss out.
              </li>
              <li>
                Seamless Booking – Secure, fast, and hassle-free reservations
                with e-tickets stored in-app.
              </li>
              <p>🚀 Everything SG – Your Singapore Adventure Starts Here!</p>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
