import type React from "react"
import { useState, useEffect } from "react"

interface ShippingRecommendationProps {
  weight: number
  dimensions: { length: number; width: number; height: number }
  destination: string
}

const ShippingRecommendation: React.FC<ShippingRecommendationProps> = ({ weight, dimensions, }) => {
  const [recommendation, setRecommendation] = useState("")

  useEffect(() => {

    const volume = dimensions.length * dimensions.width * dimensions.height
    if (weight < 1 && volume < 1000) {
      setRecommendation("Standard Shipping")
    } else if (weight < 5 && volume < 5000) {
      setRecommendation("Express Shipping")
    } else {
      setRecommendation("Priority Shipping")
    }
  }, [weight, dimensions]) 

  return (
    <div className="bg-blue-100 p-4 rounded-lg mt-4">
      <h3 className="text-lg font-semibold">AI Recommendation</h3>
      <p>
        Based on your package details, we recommend: <strong>{recommendation}</strong>
      </p>
    </div>
  )
}

export default ShippingRecommendation

