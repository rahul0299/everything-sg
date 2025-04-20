//import { Link } from 'react-router'
import Carousel from '../components/Carousel/Carousel.tsx'
import './events.css'
import TopSection from '../components/TopSection/TopSection.tsx'
import Event from '../components/Event/Event.tsx'
import {useEffect, useState} from "react";
import {CategoryData} from "../types/store.tsx";
import {API} from "../config.ts";
import {useLocation} from "react-router";


const EventsPage = () => {
  //Carousel for any offers or popular attractions - location above footer
    const location = useLocation();
    const [events, setEvents] = useState<CategoryData[]>([]);

    useEffect(() => {
        // setIsLoading(true);
        fetch(API.EVENTS)
            .then(res => {
                // setIsLoading(false);
                return res.json()
            })
            .then(data => setEvents(data));
    }, [location.pathname])

    console.log(events);


  const carouselData = []
  for (let i = 0; i < 7; i++) {
    carouselData.push(
        <div>
            Carousel Item
        </div>
    )
  }

  return (
    <>
      <div className='HeaderSection'>
        <TopSection
          pageName='attractions'
          pageImage='https://images.unsplash.com/photo-1496939376851-89342e90adcd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          title='Explore Singapore'
          phrase='Choose your next travel itinery'
        />
      </div>

      <Event events={events} />

      <div className='section'>
        <h2>Popular</h2>
        <Carousel items={carouselData} />
      </div>
    </>
  )
}

export { EventsPage }
