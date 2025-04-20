import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {CategoryData} from "../../types/store.tsx";
import {getCategory, getCategoryBaseUrl, getImgUrl} from "../../utlis.ts";
import DetailsPagePlaceholder from "../../components/DetailsPagePlaceholder.tsx";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {format} from "date-fns/format";
import {useAuth} from "../../store/AuthContext.tsx";

const DetailsPage = () => {
    const { id } = useParams()
    const user = useAuth();
    const navigate = useNavigate();

    const [data, setData] = useState<CategoryData | null>(null)
    const [date, setDate] = useState<string>('')
    const [selectedSlot, setSelectedSlot] = useState<string>('')

    const category = getCategory(location.pathname)
    const categoryBaseUrl = getCategoryBaseUrl(category)

    console.log(categoryBaseUrl);


    useEffect(() => {
        // setIsLoading(true);
        fetch(`${categoryBaseUrl}${id}`, { signal: AbortSignal.timeout(1000) })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    throw new Error("Failed to fetch data");
                }
            })
            .then(jsonData => setData(jsonData))
            .catch((err) => {
                console.error(err);
            })
        // .finally(() => setIsLoading(false));
    }, [categoryBaseUrl, id]);

    console.log(data);

    return <>
        {
            data ? (
                <div>
                    {/* Hero Section */}
                    <div className='attraction-hero'>
                        <img
                            src={getImgUrl(category, String(data?.id), data?.images[0])}
                            alt={data?.name}
                            className='attraction-hero-image'
                        />
                        <div className='hero-content'>
                            <h1>{data?.name}</h1>
                            <button className='action-button'>
                                <span>Book Now</span>
                            </button>
                        </div>
                    </div>

                    {/* Attraction Details Section */}
                    <div className='attraction-details'>
                        <h1>About</h1>
                        <p>{data?.description}</p>

                        {/* Attraction Details */}
                        <div className='details-section'>
                            <h3>Details</h3>
                            <ul>
                                <li className='details-item'>
                                    <strong>Location:</strong> {data?.location}
                                </li>
                                <li className='details-item'>
                                    <strong>Opening Hours:</strong> {data?.operating_hours}
                                </li>
                                <li className='details-item'>
                                    <strong>Cost:</strong> {data?.price} SGD
                                </li>
                            </ul>
                        </div>

                        <div className='Booking-section'>
                            <h3>Select Your Date and Time</h3>

                            {/* Date and Time Picker */}
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    views={['day', 'month', 'year']}
                                    format='dd/MM/yyyy'
                                    disablePast
                                    sx={{ width: "250px"}}
                                    onChange={(e) => setDate(format(e as Date, 'yyyy-MM-dd'))}
                                />
                            </LocalizationProvider>

                            {/* Time Slot Picker */}
                            <div className='time-slot-picker'>
                                <h4>Time Slots</h4>
                                <div className='slot-list'>
                                    {['10:00 AM', '11:30 AM', '1:00 PM', '3:30 PM', '5:00 PM'].map(
                                        (slot) => (
                                            <button
                                                key={slot}
                                                className={`slot-button ${
                                                    selectedSlot === slot ? 'selected' : ''
                                                }`}
                                                onClick={() => setSelectedSlot(slot)}
                                            >
                                                {slot}
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>



                            {
                                user ? (
                                    <button
                                        className="primary-button"
                                        style={{
                                            marginTop: "2rem"
                                        }}
                                        disabled={!date || !selectedSlot}
                                        onClick={() => {
                                            navigate(`${location.pathname}/book`, { state: {
                                                    id: data.id,
                                                    image: getImgUrl(category, String(data.id), data?.images[0] || `bg.jpg`),
                                                    name: data?.name,
                                                    category: category,
                                                    price: data?.price,
                                                    session: {
                                                        date: date,
                                                        time: selectedSlot,
                                                        venue: data?.location
                                                    }
                                                }});
                                        } }
                                    >Proceed To Booking</button>
                                ) : (
                                    <span style={{ color: "red", marginTop: "2rem", fontSize: "0.8rem", fontStyle: "italic", textAlign: "center" }}>You need to be logged in to make a booking.</span>
                                )
                            }
                        </div>

                        {/* Highlights */}
                        <h3>Highlights</h3>
                        <div className='highlights'>
                            {data?.tags.map((highlight, index) => (
                                <span key={index} className='highlight-tag'>
              {highlight}
            </span>
                            ))}
                        </div>

                        {/* Gallery Section */}
                        <h3>Gallery</h3>
                        <div className='gallery'>
                            {data?.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={getImgUrl(category, String(data?.id), image)}
                                    alt={`Gallery image ${index + 1}`}
                                    className='gallery-image'
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                    <DetailsPagePlaceholder />
                )
        }
    </>
}


export default DetailsPage;