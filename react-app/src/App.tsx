import './App.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Login from "./pages/auth/Login.tsx";
import SignUp from "./pages/auth/Signup.tsx";
import HomePage from "./pages/Homepage.tsx";
import {MoviesPage} from "./pages/Movies.tsx";
import {EventsPage} from "./pages/Events.tsx";
import {AttractionsPage} from "./pages/Attractions.tsx";
import {DiningPage} from "./pages/Dining.tsx";
import Layout from "./layouts/Layout.tsx";
import OTPVerification from "./pages/auth/OTPVerification.tsx";
import {CartProvider} from "./store/CartContext.tsx";
import {AuthProvider} from "./store/AuthContext.tsx";
import MovieDetails from "./pages/movie/MovieDetails.tsx";
import {Cart} from "./components/Cart/Cart.tsx";
import BookingPage from "./pages/booking/BookingPage.tsx";
import ProtectedRoute from "./layouts/ProtectedRoute.tsx";
import {Slide, ToastContainer} from "react-toastify";
import CheckoutPage from './pages/checkout/CheckoutPage.tsx';
import Profile from "./pages/profile/Profile.tsx";
import DetailsPage from "./pages/details/DetailsPage.tsx";

function App() {
  return (
      <AuthProvider>
          <BrowserRouter>
              <CartProvider>
                  <Cart />
                  <ToastContainer
                      position="top-center"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick={false}
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="colored"
                      transition={Slide}
                  />
                  <Routes>
                      <Route path="/" element={<Layout />} >
                          <Route index element={<HomePage />} />
                          <Route path="login" element={<Login />} />
                          <Route path="signup" element={<SignUp />} />
                          <Route path="movies" element={<MoviesPage />} />
                          <Route path="movies/:id" element={< MovieDetails/>} />
                          <Route path="events" element={<EventsPage />} />
                          <Route path="events/:id" element={<DetailsPage />} />
                          <Route path="attractions" element={<AttractionsPage />} />
                          <Route path="attractions/:id" element={<DetailsPage />} />
                          <Route path="dining" element={<DiningPage />} />
                          <Route path="dining/:id" element={<DetailsPage />} />
                          <Route path="verification" element={<OTPVerification num_digits={6} />} />
                          <Route path="/checkout" element={<CheckoutPage />} />

                          <Route path="/profile" element={<Profile />} />


                          <Route element={<ProtectedRoute />}>
                              <Route path="/movies/:id/book" element={<BookingPage />} />
                              <Route path="/events/:id/book" element={<BookingPage />} />
                              <Route path="/attractions/:id/book" element={<BookingPage />} />
                              <Route path="/dining/:id/book" element={<BookingPage />} />
                          </Route>
                      </Route>
                  </Routes>
              </CartProvider>
          </BrowserRouter>
      </AuthProvider>
  )
}

export default App
