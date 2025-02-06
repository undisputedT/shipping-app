import type React from "react"
import { motion } from "framer-motion"

interface ProgressBarProps {
  steps: string[]
  currentStep: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStep }) => {
  return (
    <div className="mb-8">
      {/* Desktop view */}
      <div className="hidden sm:flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center text-white">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStep ? " bg-teal-400 text-white" : "bg-gray-300 text-gray-600"
                }`}
              >
                {index + 1}
              </div>
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-xs text-center w-20">{step}</div>
            </motion.div>
            {index < steps.length - 1 && (
              <motion.div
                className={`h-1 w-full mx-2 ${index < currentStep ? "bg-blue-500" : "bg-gray-300"}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Mobile view */}
      <div className="sm:hidden flex items-center justify-between">
        {steps.map((_, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index <= currentStep ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"
              }`}
            >
              {index + 1}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="sm:hidden text-center mt-4">
        <span className="font-semibold">{steps[currentStep]}</span>
      </div>
    </div>
  )
}

export default ProgressBar

