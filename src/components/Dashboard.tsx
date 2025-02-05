import type React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import backgroundImage from "../assets/images/background-image.webp";

interface Shipment {
  id: string;
  shipmentType: string;
  shippingMethod: string;
  weight: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  fragile: boolean;
  insurance: boolean;
  specialInstructions: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  senderAddress: string;
  receiverName: string;
  receiverEmail: string;
  receiverPhone: string;
  receiverAddress: string;
  status: string;
  estimatedDelivery: string;
}

const Dashboard: React.FC = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    
    const fetchShipments = async () => {
      
      const mockShipments: Shipment[] = [
        {
          id: "1",
          shipmentType: "Foreign",
          shippingMethod: "Air Freight",
          weight: "50",
          dimensions: {
            length: "100",
            width: "50",
            height: "50",
          },
          fragile: true,
          insurance: true,
          specialInstructions: "Handle with care",
          senderName: "John Doe",
          senderEmail: "john@example.com",
          senderPhone: "1234567890",
          senderAddress: "123 Sender St, City, Country",
          receiverName: "Jane Smith",
          receiverEmail: "jane@example.com",
          receiverPhone: "0987654321",
          receiverAddress: "456 Receiver Ave, City, Country",
          status: "In Transit",
          estimatedDelivery: "2023-06-15",
        },
        {
          id: "2",
          shipmentType: "Local",
          shippingMethod: "Express",
          weight: "20",
          dimensions: {
            length: "50",
            width: "30",
            height: "20",
          },
          fragile: false,
          insurance: false,
          specialInstructions: "",
          senderName: "Alice Johnson",
          senderEmail: "alice@example.com",
          senderPhone: "1122334455",
          senderAddress: "789 Local St, City, Country",
          receiverName: "Bob Williams",
          receiverEmail: "bob@example.com",
          receiverPhone: "5566778899",
          receiverAddress: "101 Near Ave, City, Country",
          status: "Delivered",
          estimatedDelivery: "2023-06-10",
        },
      ];

      setShipments(mockShipments);
    };

    fetchShipments();
  }, []);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="container mx-auto px-4 py-24 md:py-12 flex flex-col justify-center h-screen bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <h1 className="text-3xl font-bold mb-8 text-white">Your Shipments</h1>

      {/* Mobile and Tablet View */}
      <div className="lg:hidden">
        <button
          onClick={toggleOpen}
          className="w-full bg-white shadow-md rounded-lg p-4 mt-12  flex justify-between items-center"
        >
          <span className="font-semibold">View Shipments</span>
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white shadow-md rounded-lg mt-2 overflow-hidden"
            >
              {shipments.map((shipment) => (
                <div key={shipment.id} className="p-4 border-b last:border-b-0">
                  <p>
                    <strong>ID:</strong> {shipment.id}
                  </p>
                  <p>
                    <strong>Type:</strong> {shipment.shipmentType}
                  </p>
                  <p>
                    <strong>Method:</strong> {shipment.shippingMethod}
                  </p>
                  <p>
                    <strong>Weight:</strong> {shipment.weight} kg
                  </p>
                  <p>
                    <strong>Dimensions:</strong> {shipment.dimensions.length}x
                    {shipment.dimensions.width}x{shipment.dimensions.height} cm
                  </p>
                  <p>
                    <strong>Fragile:</strong> {shipment.fragile ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Insurance:</strong>{" "}
                    {shipment.insurance ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Special Instructions:</strong>{" "}
                    {shipment.specialInstructions || "None"}
                  </p>
                  <p>
                    <strong>Sender:</strong> {shipment.senderName}
                  </p>
                  <p>
                    <strong>Receiver:</strong> {shipment.receiverName}
                  </p>
                  <p>
                    <strong>Status:</strong> {shipment.status}
                  </p>
                  <p>
                    <strong>Est. Delivery:</strong> {shipment.estimatedDelivery}
                  </p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Method
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Weight
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dimensions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fragile
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Insurance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Special Instructions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sender
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Receiver
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Est. Delivery
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {shipments.map((shipment) => (
              <tr key={shipment.id}>
                <td className="px-6 py-4 whitespace-nowrap">{shipment.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.shipmentType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.shippingMethod}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.weight} kg
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.dimensions.length}x{shipment.dimensions.width}x
                  {shipment.dimensions.height} cm
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.fragile ? "Yes" : "No"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.insurance ? "Yes" : "No"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.specialInstructions || "None"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.senderName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.receiverName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.estimatedDelivery}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
