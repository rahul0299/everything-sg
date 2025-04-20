// import { useParams } from 'react-router'
// import data from '../../data/sample'
// import './attractiondetailspage.css'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
// import { format } from 'date-fns/format'
// import { useState } from 'react'
//
// const AttractionDetails = () => {
//   const { id } = useParams()
//   const attraction = data.attractions.find((item) => item.id === id)
//   const [date, setDate] = useState<string>('')
//   const [selectedSlot, setSelectedSlot] = useState<string>('')
//
//   if (!attraction) {
//     return <p>Attraction not found!</p>
//   }
//
//   console.log(date)
//   console.log(selectedSlot)
//
//   return (
//     <div>
//       {/* Hero Section */}
//       <div className='attraction-hero'>
//         <img
//           src={attraction.img_url}
//           alt={attraction.name}
//           className='attraction-hero-image'
//         />
//         <div className='hero-content'>
//           <h1>{attraction.name}</h1>
//           <button className='action-button'>
//             <span>Book Now</span>
//           </button>
//         </div>
//       </div>
//
//       {/* Attraction Details Section */}
//       <div className='attraction-details'>
//         <h1>About</h1>
//         <p>{attraction.description}</p>
//
//         {/* Attraction Details */}
//         <div className='details-section'>
//           <h3>Details</h3>
//           <ul>
//             <li className='details-item'>
//               <strong>Location:</strong> {attraction.details.location}
//             </li>
//             <li className='details-item'>
//               <strong>Opening Hours:</strong> {attraction.details.openingHours}
//             </li>
//             <li className='details-item'>
//               <strong>Admission:</strong> {attraction.details.admission}
//             </li>
//             <li className='details-item'>
//               <strong>Cost:</strong> {attraction.details.cost}
//             </li>
//           </ul>
//         </div>
//
//         <div className='Booking-section'>
//           <h3>Available Date and Time</h3>
//
//           {/* Date and Time Picker */}
//           <LocalizationProvider dateAdapter={AdapterDateFns}>
//             <DatePicker
//               views={['day', 'month', 'year']}
//               format='dd/MM/yyyy'
//               disablePast
//               slotProps={{
//                 textField: { fullWidth: true },
//               }}
//               onChange={(e) => setDate(format(e as Date, 'yyyy-MM-dd'))}
//             />
//           </LocalizationProvider>
//
//           {/* Time Slot Picker */}
//           <div className='time-slot-picker'>
//             <h4>Time Slots</h4>
//             <div className='slot-list'>
//               {['10:00 AM', '11:30 AM', '1:00 PM', '3:30 PM', '5:00 PM'].map(
//                 (slot) => (
//                   <button
//                     key={slot}
//                     className={`slot-button ${
//                       selectedSlot === slot ? 'selected' : ''
//                     }`}
//                     onClick={() => setSelectedSlot(slot)}
//                   >
//                     {slot}
//                   </button>
//                 )
//               )}
//             </div>
//           </div>
//         </div>
//
//         {/* Highlights */}
//         <h3>Highlights</h3>
//         <div className='highlights'>
//           {attraction.details.highlights.map((highlight, index) => (
//             <span key={index} className='highlight-tag'>
//               {highlight}
//             </span>
//           ))}
//         </div>
//
//         {/* Gallery Section */}
//         <h3>Gallery</h3>
//         <div className='gallery'>
//           {attraction.details.gallery.map((image, index) => (
//             <img
//               key={index}
//               src={image}
//               alt={`Gallery image ${index + 1}`}
//               className='gallery-image'
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }
//
// export default AttractionDetails
