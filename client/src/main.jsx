import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Discover from './pages/Discover'
import Trips from './pages/Trips'
import Review from './pages/Review'
import Forums from './pages/Forums'
import Contributors from './pages/Contributors'
import TicketBooking from './pages/TicketBooking'
import TravelGuidesCarousel from './pages/TravelGuidesProfiles'
import TravelPackages from './pages/TravelPackages'
import HotelBookingPage from './pages/HotelBookingPage'

// Auth pages
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/Auth/ProtectedRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/discover', element: <Discover /> },
      { path: '/trips', element: <Trips /> },
      { path: '/review', element: <Review /> },
      { path: '/forums', element: <Forums /> },
      { path: '/contributors', element: <Contributors /> },
      { path: '/ticket', element: <TicketBooking /> },
      { path: '/guides', element: <TravelGuidesCarousel /> },
      { path: '/packages', element: <TravelPackages /> },
      { path: '/hotels', element: <HotelBookingPage /> },
      { path: '/contact', element: <Contact /> },
      
      // Auth routes
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      
      // Protected routes
      { 
        path: '/dashboard', 
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ) 
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)