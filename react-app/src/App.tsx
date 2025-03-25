import './App.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Login from "./pages/auth/Login.tsx";
import SignUp from "./pages/auth/Signup.tsx";
import {HomePage} from "./pages/Homepage.tsx";
import {StoreProvider} from "./store/AppContext.tsx";
import {MoviesPage} from "./pages/Movies.tsx";
import {EventsPage} from "./pages/Events.tsx";
import {AttractionsPage} from "./pages/Attractions.tsx";
import {DiningPage} from "./pages/Dining.tsx";
import Layout from "./layouts/Layout.tsx";

function App() {

  return (
      <StoreProvider>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Layout />} >
                      <Route index element={<HomePage />} />
                      <Route path="login" element={<Login />} />
                      <Route path="signup" element={<SignUp />} />
                      <Route path="movies" element={<MoviesPage />} />
                      <Route path="events" element={<EventsPage />} />
                      <Route path="attractions" element={<AttractionsPage />} />
                      <Route path="dining" element={<DiningPage />} />
                  </Route>
              </Routes>
          </BrowserRouter>
      </StoreProvider>
  )
}

export default App
