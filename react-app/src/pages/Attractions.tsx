//import { Link } from 'react-router'
import Carousel from '../components/Carousel/Carousel.tsx'
import Footer from '../components/Footer/Footer.tsx'
import './Attractions.css'
import TopSection from '../components/TopSection/TopSection.tsx'
import Destination from '../components/Destination/Destination.tsx'

const getRandomColor = (): string => {
  return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
    Math.random() * 255
  })`
}

const AttractionsPage = () => {
  //Carousel for any offers or popular attractions - location above footer
  const carouselData = []
  for (let i = 0; i < 7; i++) {
    carouselData.push({ item: i, bgcolor: getRandomColor() })
  }

  return (
    <>
      <div className='HeaderSection'>
        <TopSection
          pageName='attractions'
          pageImage='https://images.unsplash.com/photo-1496939376851-89342e90adcd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          title='Explore Singapore'
          phrase='Choose your next travel itinerary'
        />
      </div>

      <Destination />

      <div className='section'>
        <h2>Popular</h2>
        <Carousel items={carouselData} />
      </div>

      <div className='footer'>
        <Footer />
      </div>
    </>
  )
}

export { AttractionsPage }
