import type React from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ShippingRecommendation from "./ShippingRecommendation";
import { X } from "lucide-react";

interface ShipmentDetailsProps {
  values: {
    shipmentType: string;
    shippingMethod: string;
    weight: string;
    dimensions: {
      length: string;
      width: string;
      height: string;
    };
    fragile: boolean;
    fragileItemType: string;
    insurance: boolean;
    specialInstructions: string;
    receiverAddress: string;
    deliveryDate: Date | null;
    packageImages?: string[];
  };
  errors?: {
    shipmentType?: string;
    shippingMethod?: string;
    weight?: string;
    dimensions?: {
      length?: string;
      width?: string;
      height?: string;
    };
    fragile?: string;
    fragileItemType?: string;
    insurance?: string;
    specialInstructions?: string;
    receiverAddress?: string;
    deliveryDate?: string;
  };
  touched?: {
    shipmentType?: boolean;
    shippingMethod?: boolean;
    weight?: boolean;
    dimensions?: {
      length?: boolean;
      width?: boolean;
      height?: boolean;
    };
    fragile?: boolean;
    fragileItemType?: boolean;
    insurance?: boolean;
    specialInstructions?: boolean;
    receiverAddress?: boolean;
    deliveryDate?: boolean;
  };
  calculatePrice: () => string;
}

const ShipmentDetails: React.FC<ShipmentDetailsProps> = ({
  values,
  calculatePrice,
}) => {
  const { setFieldValue } = useFormikContext();
  const inputVariants = {
    focus: { scale: 1.05, boxShadow: "0px 0px 8px rgba(0,0,0,0.2)" },
  };

  const getDeliveryDateRange = () => {
    const today = new Date();
    if (values.shipmentType === "local") {
      if (values.shippingMethod === "express") {
        const minDate = new Date(today);
        minDate.setDate(today.getDate() + 1);
        const maxDate = new Date(today);
        maxDate.setDate(today.getDate() + 3);
        return { minDate, maxDate };
      } else if (values.shippingMethod === "standard") {
        const minDate = new Date(today);
        minDate.setDate(today.getDate() + 5);
        const maxDate = new Date(today);
        maxDate.setDate(today.getDate() + 13);
        return { minDate, maxDate };
      }
    }
    return { minDate: today, maxDate: undefined };
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length <= 2) {
      const imagePromises = Array.from(files).map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
        });
      });

      Promise.all(imagePromises)
        .then((base64Images) => {
          setFieldValue(
            "packageImages",
            [...(values.packageImages || []), ...base64Images].slice(0, 2)
          );
        })
        .catch((error) => {
          console.error("Error converting images:", error);
        });
    }
  };

  const handleDeleteImage = (index: number) => {
    const newImages = values.packageImages?.filter((_, i) => i !== index);
    setFieldValue("packageImages", newImages);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Shipment Details</h2>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="shipmentType"
            className="block text-sm font-medium text-gray-700"
          >
            Shipment Type
          </label>
          <Field
            as="select"
            id="shipmentType"
            name="shipmentType"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">Select shipment type</option>
            <option value="local">Local</option>
            <option value="foreign">Foreign</option>
          </Field>
          <ErrorMessage
            name="shipmentType"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
        {values.shipmentType && (
          <div>
            <label
              htmlFor="shippingMethod"
              className="block text-sm font-medium text-gray-700"
            >
              Shipping Method
            </label>
            <Field
              as="select"
              id="shippingMethod"
              name="shippingMethod"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="">Select shipping method</option>
              {values.shipmentType === "foreign" ? (
                <>
                  <option value="air">Air Freight</option>
                  <option value="sea">Sea Freight</option>
                </>
              ) : (
                <>
                  <option value="express">Express</option>
                  <option value="standard">Standard</option>
                </>
              )}
            </Field>
            <ErrorMessage
              name="shippingMethod"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
        )}
        {values.shipmentType === "local" && values.shippingMethod && (
          <div>
            <label
              htmlFor="deliveryDate"
              className="block text-sm font-medium text-gray-700"
            >
              Expected Delivery Date
            </label>
            <DatePicker
              selected={values.deliveryDate}
              onChange={(date: Date | null) =>
                setFieldValue("deliveryDate", date)
              }
              minDate={getDeliveryDateRange().minDate}
              maxDate={getDeliveryDateRange().maxDate}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholderText="Select delivery date"
              dateFormat="MMMM d, yyyy"
            />
            <ErrorMessage
              name="deliveryDate"
              component="div"
              className="text-red-500 text-xs pl-1 pt-1"
            />
          </div>
        )}
        <div>
          <label
            htmlFor="weight"
            className="block text-sm font-medium text-gray-700"
          >
            Weight (kg)
          </label>
          <Field
            type="number"
            id="weight"
            name="weight"
            min="0"
            step="0.1"
            as={motion.input}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            whileFocus="focus"
            variants={inputVariants}
          />
          <ErrorMessage
            name="weight"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Dimensions (cm)
          </label>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Field
                type="number"
                name="dimensions.length"
                placeholder="Length"
                min="0"
                as={motion.input}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                whileFocus="focus"
                variants={inputVariants}
              />
              <ErrorMessage
                name="dimensions.length"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <Field
                type="number"
                name="dimensions.width"
                placeholder="Width"
                min="0"
                as={motion.input}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                whileFocus="focus"
                variants={inputVariants}
              />
              <ErrorMessage
                name="dimensions.width"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <Field
                type="number"
                name="dimensions.height"
                placeholder="Height"
                min="0"
                as={motion.input}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                whileFocus="focus"
                variants={inputVariants}
              />
              <ErrorMessage
                name="dimensions.height"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>
        </div>
        <div>
          <label className="flex items-center space-x-2">
            <Field type="checkbox" name="fragile" className="form-checkbox" />
            <span>Fragile Item</span>
          </label>
          {values.fragile && (
            <Field
              as="select"
              name="fragileItemType"
              className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="">Select fragile item type</option>
              <option value="glass">Glass</option>
              <option value="electronics">Electronics</option>
              <option value="artwork">Artwork</option>
              <option value="musical-instrument">Musical Instrument</option>
              <option value="ceramics">Ceramics</option>
            </Field>
          )}
          <ErrorMessage
            name="fragileItemType"
            component="div"
            className="text-red-500 text-xs pl-1 pt-1"
          />
        </div>
        <div>
          <label className="flex items-center space-x-2">
            <Field type="checkbox" name="insurance" className="form-checkbox" />
            <span>Insurance</span>
          </label>
        </div>
        <div className="relative">
          <span className="block text-sm font-medium text-gray-700 mb-2">
            Package Images (Max 2)
          </span>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <input
              type="file"
              id="packageImages"
              name="packageImages"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />

            {!values.packageImages || values.packageImages.length === 0 ? (
              <label
                htmlFor="packageImages"
                className="cursor-pointer block text-center p-4 hover:bg-gray-50 rounded-md transition-colors"
              >
                <span className="text-blue-600">Click to upload</span> or drag
                and drop
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, GIF up to 10MB
                </p>
              </label>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {values.packageImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Package ${index + 1}`}
                      className="w-full h-40 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                    {(values.packageImages || []).length < 2 && (
                      <label
                        htmlFor="packageImages"
                        className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-md"
                      >
                        Add Another Image
                      </label>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="specialInstructions"
            className="block text-sm font-medium text-gray-700"
          >
            Special Instructions
          </label>
          <Field
            as="textarea"
            id="specialInstructions"
            name="specialInstructions"
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-lg font-semibold">
            Estimated Price: ${calculatePrice()}
          </p>
        </motion.div>
        <ShippingRecommendation
          weight={Number.parseFloat(values.weight)}
          dimensions={{
            length: Number.parseFloat(values.dimensions.length),
            width: Number.parseFloat(values.dimensions.width),
            height: Number.parseFloat(values.dimensions.height),
          }}
          destination={values.receiverAddress}
        />
      </div>
    </div>
  );
};

export default ShipmentDetails;
