import type React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import backgroundImage from "../assets/images/background-image.webp";

const SuccessPage: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-gray-100 flex items-center justify-center px-4 h-full bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <motion.div
        className="bg-white p-8 rounded-lg shadow-md text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle className="w-16 h-16 text-teal-400 mx-auto mb-4" />
        </motion.div>
        <h1 className="text-2xl font-bold mb-4">Shipment Successful!</h1>
        <p className="mb-6">
          Your shipment has been successfully booked and is being processed.
        </p>
        <Link
          to="/dashboard"
          className="bg-teal-400 text-white px-6 py-2 rounded hover:bg-teal-600 transition-colors"
        >
          View Shipments
        </Link>
      </motion.div>
    </div>
  );
};

export default SuccessPage;
