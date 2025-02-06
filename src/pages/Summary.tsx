import type React from "react"

interface SummaryProps {
  formData: {
    shipmentType: string
    shippingMethod: string
    weight: string
    dimensions: {
      length: string
      width: string
      height: string
    }
    senderName: string
    senderEmail: string
    senderPhone: string
    senderAddress: string
    receiverName: string
    receiverEmail: string
    receiverPhone: string
    receiverAddress: string
    deliveryDate: Date | null
    packageImages?: string[]
    fragile: boolean
    fragileItemType?: string
  }
  calculatePrice: () => string
}

const Summary: React.FC<SummaryProps> = ({ formData, calculatePrice }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Booking Summary</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Shipment Details</h3>
          <p>Type: {formData.shipmentType}</p>
          <p>Shipping Method: {formData.shippingMethod}</p>
          <p>Weight: {formData.weight} kg</p>
          <p>
            Dimensions: {formData.dimensions.length} x {formData.dimensions.width} x {formData.dimensions.height} cm
          </p>
          {formData.fragile && (
            <p>Fragile Item: {formData.fragileItemType}</p>
          )}
          {formData.shipmentType === "local" && formData.deliveryDate && (
            <p>Expected Delivery: {formData.deliveryDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
          )}
        </div>

        {formData.packageImages && formData.packageImages.length > 0 && (
          <div>
            <h3 className="text-lg font-medium">Package Images</h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {formData.packageImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Package ${index + 1}`}
                    className="w-full h-40 object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="text-lg font-medium">Sender Details</h3>
          <p>Name: {formData.senderName}</p>
          <p>Email: {formData.senderEmail}</p>
          <p>Phone: {formData.senderPhone}</p>
          <p>Address: {formData.senderAddress}</p>
        </div>

        <div>
          <h3 className="text-lg font-medium">Receiver Details</h3>
          <p>Name: {formData.receiverName}</p>
          <p>Email: {formData.receiverEmail}</p>
          <p>Phone: {formData.receiverPhone}</p>
          <p>Address: {formData.receiverAddress}</p>
        </div>

        <div>
          <h3 className="text-lg font-medium">Total Price</h3>
          <p className="text-xl font-bold">${calculatePrice()}</p>
        </div>
      </div>
    </div>
  )
}

export default Summary