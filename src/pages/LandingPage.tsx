import type React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import backgroundImage from "../assets/images/background-image.webp"

const LandingPage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  return (
    <div
      className="w-full h-screen bg-cover bg-no-repeat bg-center flex items-center "
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <motion.div
        className="container mx-auto px-4 py-12 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="text-4xl font-bold text-center mb-8 text-white" variants={itemVariants}>
          Welcome to ShipEase
        </motion.h1>
        <div className=" flex items-center justify-center">
          <motion.div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md" variants={itemVariants}>
            <h2 className="text-2xl font-semibold mb-4">Easy Shipping Solutions</h2>
            <p className="mb-4">
              ShipEase provides fast, reliable, and cost-effective shipping services for businesses and individuals.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className=" flex items-center justify-center">
              <Link to="/book" className="bg-teal-400 text-white px-4 py-2 rounded hover:bg-teal-600 inline-block">
                Book a Shipment
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default LandingPage

