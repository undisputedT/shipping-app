import type React from "react"
import { Field, ErrorMessage } from "formik"
import { motion } from "framer-motion"

interface SenderDetailsProps {
  values: {
    senderName: string;
    senderEmail: string;
    senderPhone: string;
    senderAddress: string;
  };
  errors?: {
    senderName?: string;
    senderEmail?: string;
    senderPhone?: string;
    senderAddress?: string;
  };
  touched?: {
    senderName?: boolean;
    senderEmail?: boolean;
    senderPhone?: boolean;
    senderAddress?: boolean;
  };
}

const SenderDetails: React.FC<SenderDetailsProps> = () => {
  const inputVariants = {
    focus: { scale: 1.05, boxShadow: "0px 0px 8px rgba(0,0,0,0.2)" },
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-white">Sender Details</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="senderName" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <Field
            type="text"
            id="senderName"
            name="senderName"
            as={motion.input}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            whileFocus="focus"
            variants={inputVariants}
          />
          <ErrorMessage name="senderName" component="div" className="text-red-500 text-sm" />
        </div>

        <div>
          <label htmlFor="senderEmail" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <Field
            type="email"
            id="senderEmail"
            name="senderEmail"
            as={motion.input}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            whileFocus="focus"
            variants={inputVariants}
          />
          <ErrorMessage name="senderEmail" component="div" className="text-red-500 text-sm" />
        </div>

        <div>
          <label htmlFor="senderPhone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <Field
            type="tel"
            id="senderPhone"
            name="senderPhone"
            as={motion.input}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            whileFocus="focus"
            variants={inputVariants}
          />
          <ErrorMessage name="senderPhone" component="div" className="text-red-500 text-sm" />
        </div>

        <div>
          <label htmlFor="senderAddress" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <Field
            as="textarea"
            id="senderAddress"
            name="senderAddress"
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          <ErrorMessage name="senderAddress" component="div" className="text-red-500 text-sm" />
        </div>
      </div>
    </div>
  )
}

export default SenderDetails