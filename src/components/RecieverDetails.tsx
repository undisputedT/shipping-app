import type React from "react";
import { Field, ErrorMessage } from "formik";
import { motion } from "framer-motion";

interface ReceiverDetailsProps {
  values: {
    receiverName: string;
    receiverEmail: string;
    receiverPhone: string;
    receiverAddress: string;
  };
  errors?: {
    receiverName?: string;
    receiverEmail?: string;
    receiverPhone?: string;
    receiverAddress?: string;
  };
  touched?: {
    receiverName?: boolean;
    receiverEmail?: boolean;
    receiverPhone?: boolean;
    receiverAddress?: boolean;
  };
}

const ReceiverDetails: React.FC<ReceiverDetailsProps> = () => {
  const inputVariants = {
    focus: { scale: 1.05, boxShadow: "0px 0px 8px rgba(0,0,0,0.2)" },
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-white md:text-black">
        Receiver Details
      </h2>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="receiverName"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <Field
            type="text"
            id="receiverName"
            name="receiverName"
            as={motion.input}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            whileFocus="focus"
            variants={inputVariants}
          />
          <ErrorMessage
            name="receiverName"
            component="div"
            className="text-red-500 text-xs pl-1 pt-1"
          />
        </div>

        <div>
          <label
            htmlFor="receiverEmail"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <Field
            type="email"
            id="receiverEmail"
            name="receiverEmail"
            as={motion.input}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            whileFocus="focus"
            variants={inputVariants}
          />
          <ErrorMessage
            name="receiverEmail"
            component="div"
            className="text-red-500 text-xs pl-1 pt-1"
          />
        </div>

        <div>
          <label
            htmlFor="receiverPhone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <Field
            type="tel"
            id="receiverPhone"
            name="receiverPhone"
            as={motion.input}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            whileFocus="focus"
            variants={inputVariants}
          />
          <ErrorMessage
            name="receiverPhone"
            component="div"
            className="text-red-500 text-xs pl-1 pt-1"
          />
        </div>

        <div>
          <label
            htmlFor="receiverAddress"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <Field
            as="textarea"
            id="receiverAddress"
            name="receiverAddress"
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          <ErrorMessage
            name="receiverAddress"
            component="div"
            className="text-red-500 text-xs pl-1 pt-1"
          />
        </div>
      </div>
    </div>
  );
};

export default ReceiverDetails;
