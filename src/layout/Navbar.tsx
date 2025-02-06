import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <nav
      className={`fixed top-0 inset-0 h-fit w-full z-50 transition-all duration-300 ${
        hasScrolled ? "bg-teal-600" : " bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">
          ShipEase
        </Link>
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-white hover:text-teal-200 transition-colors">
            Home
          </Link>
          <Link to="/book" className="text-white hover:text-teal-200 transition-colors">
            Book Shipment
          </Link>
        </div>
        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={toggleMenu}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden ${hasScrolled ? "bg-teal-400" : "bg-teal-600"}`}
          >
            <div className="flex flex-col items-start space-y-4 p-4">
              <Link to="/" className="text-white hover:text-blue-200 transition-colors" onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/book" className="text-white hover:text-blue-200 transition-colors" onClick={toggleMenu}>
                Book Shipment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar