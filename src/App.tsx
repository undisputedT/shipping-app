import type React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import BookingForm from "./components/BookingForm"
import Dashboard from "./pages/Dashboard"
import SuccessPage from "./components/SuccessPage"
import Navbar from "./components/Navbar"

const App: React.FC = () => {
  return (
    <Router>
      <div className="relative">
        <Navbar />
        <div className="">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/book" element={<BookingForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/success" element={<SuccessPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App

