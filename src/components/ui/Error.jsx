import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow-md"
    >
      <div className="relative mb-6">
        <div className="h-16 w-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
          <ApperIcon name="AlertCircle" className="h-8 w-8 text-red-600" />
        </div>
        <div className="absolute -top-1 -right-1 h-6 w-6 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
          <ApperIcon name="X" className="h-3 w-3 text-white" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Oops! Something went wrong</h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:from-primary/90 hover:to-secondary/90 transition-all duration-200 transform hover:scale-105"
        >
          <ApperIcon name="RefreshCw" className="h-4 w-4 mr-2" />
          Try Again
        </button>
      )}
    </motion.div>
  );
};

export default Error;