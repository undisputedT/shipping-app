import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, FormikErrors, FormikTouched } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import ProgressBar from "./ProgressBar";
import ShipmentDetails from "./ShipmentDetails";
import SenderDetails from "./SenderDetails";
import ReceiverDetails from "./RecieverDetails";
import Summary from "./Summary";
import backgroundImage from "../assets/images/background-image.webp";

const steps = [
  "Shipment Details",
  "Sender Details",
  "Receiver Details",
  "Summary",
];

const validationSchema = Yup.object({
  shipmentType: Yup.string().required("Please Select a Shipment Type"),
  shippingMethod: Yup.string().required("Please Selcet a Shipment Method"),
  weight: Yup.number().positive("Must be positive").required("Required"),
  dimensions: Yup.object({
    length: Yup.number().positive("Must be positive").required("Required"),
    width: Yup.number().positive("Must be positive").required("Required"),
    height: Yup.number().positive("Must be positive").required("Required"),
  }),
  fragile: Yup.boolean(),
  insurance: Yup.boolean(),
  specialInstructions: Yup.string(),
  senderName: Yup.string().required("Please Enter Sender Name"),
  senderEmail: Yup.string().email("Invalid email").required("Please Enter Sender Email"),
  senderPhone: Yup.string().required("Please Enter Sender Phone"),
  senderAddress: Yup.string().required("Please Enter Sender Address"),
  receiverName: Yup.string().required("Please Enter Receiver Name"),
  receiverEmail: Yup.string().email("Invalid email").required("Please Enter Receiver Email"),
  receiverPhone: Yup.string().required("Please Enter Receiver Phone"),
  receiverAddress: Yup.string().required("Please Enter Receiver Address"),
});

const BookingForm: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const initialValues = {
    shipmentType: "",
    shippingMethod: "",
    weight: "",
    dimensions: {
      length: "",
      width: "",
      height: "",
    },
    fragile: false,
    insurance: false,
    specialInstructions: "",
    senderName: "",
    senderEmail: "",
    senderPhone: "",
    senderAddress: "",
    receiverName: "",
    receiverEmail: "",
    receiverPhone: "",
    receiverAddress: "",
  };

  const calculatePrice = (values: typeof initialValues) => {
    const basePrice = 0;
    const weightFactor = Number.parseFloat(values.weight) || 0;
    const volumeFactor =
      ((Number.parseFloat(values.dimensions.length) || 0) *
        (Number.parseFloat(values.dimensions.width) || 0) *
        (Number.parseFloat(values.dimensions.height) || 0)) /
      5000;

    let methodFactor = 1;
    if (values.shipmentType === "foreign") {
      methodFactor = values.shippingMethod === "air" ? 2 : 1.5;
    } else {
      methodFactor = values.shippingMethod === "express" ? 1.5 : 1;
    }

    let price =
      (basePrice + weightFactor * 2 + volumeFactor * 3) * methodFactor;
    if (values.fragile) price *= 1.2;
    if (values.insurance) price *= 1.1;

    return price.toFixed(2);
  };

  const pageVariants = {
    initial: { opacity: 0, x: "-100%" },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: "100%" },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  // Function to validate the current step
  const validateStep = (
    errors: FormikErrors<typeof initialValues>,
    touched: FormikTouched<typeof initialValues>
  ) => {
    switch (currentStep) {
      case 0: // Shipment Details
        return (
          touched.shipmentType &&
          !errors.shipmentType &&
          touched.shippingMethod &&
          !errors.shippingMethod &&
          touched.weight &&
          !errors.weight &&
          touched.dimensions?.length &&
          !errors.dimensions?.length &&
          touched.dimensions?.width &&
          !errors.dimensions?.width &&
          touched.dimensions?.height &&
          !errors.dimensions?.height
        );
      case 1: // Sender Details
        return (
          touched.senderName &&
          !errors.senderName &&
          touched.senderEmail &&
          !errors.senderEmail &&
          touched.senderPhone &&
          !errors.senderPhone &&
          touched.senderAddress &&
          !errors.senderAddress
        );
      case 2: // Receiver Details
        return (
          touched.receiverName &&
          !errors.receiverName &&
          touched.receiverEmail &&
          !errors.receiverEmail &&
          touched.receiverPhone &&
          !errors.receiverPhone &&
          touched.receiverAddress &&
          !errors.receiverAddress
        );
      default:
        return true;
    }
  };

  return (
    <div
      className="container mx-auto px-4 py-20 md:py-12 h-full bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="max-w-3xl mx-auto flex flex-col gap-2">
        <h1 className="text-3xl text-white font-bold text-center mb-8">
          Cargo Shipment Booking
        </h1>
        <ProgressBar steps={steps} currentStep={currentStep} />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Form submitted:", values);
            navigate("/success", { state: { shipment: values } });
          }}
        >
          {({ values, errors, touched, submitForm }) => (
            <Form>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  className="bg-white shadow-md rounded-lg p-6 mt-8"
                >
                  {currentStep === 0 && (
                    <ShipmentDetails
                      values={values}
                      calculatePrice={() => calculatePrice(values)}
                    />
                  )}
                  {currentStep === 1 && (
                    <SenderDetails
                      values={values}
                      errors={errors}
                      touched={touched}
                    />
                  )}
                  {currentStep === 2 && (
                    <ReceiverDetails
                      values={values}
                      errors={errors}
                      touched={touched}
                    />
                  )}
                  {currentStep === 3 && (
                    <Summary
                      formData={values}
                      calculatePrice={() => calculatePrice(values)}
                    />
                  )}

                  <div className="mt-8 flex justify-between">
                    <motion.button
                      type="button"
                      onClick={() =>
                        setCurrentStep((prev) => Math.max(prev - 1, 0))
                      }
                      disabled={currentStep === 0}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l disabled:opacity-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Previous
                    </motion.button>
                    <motion.button
                      type={
                        currentStep === steps.length - 1 ? "submit" : "button"
                      }
                      onClick={() => {
                        if (currentStep < steps.length - 1) {
                          // Check if current step is valid before proceeding
                          if (validateStep(errors, touched)) {
                            setCurrentStep((prev) =>
                              Math.min(prev + 1, steps.length - 1)
                            );
                          } else {
                            // Optionally, you could add a toast or error message here
                            console.log("Please complete all required fields");
                          }
                        } else {
                          submitForm();
                        }
                      }}
                      className="bg-teal-400 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-r disabled:opacity-50"
                      disabled={!validateStep(errors, touched)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {currentStep === steps.length - 1 ? "Submit" : "Next"}
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BookingForm;
