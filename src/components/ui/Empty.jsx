import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No data found", 
  message = "Get started by adding your first item", 
  actionText = "Add New",
  onAction,
  icon = "Database"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow-md"
    >
      <div className="relative mb-6">
        <div className="h-20 w-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
          <ApperIcon name={icon} className="h-10 w-10 text-primary" />
        </div>
        <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-gradient-to-br from-accent to-yellow-500 rounded-full flex items-center justify-center">
          <ApperIcon name="Plus" className="h-4 w-4 text-white" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">{message}</p>
      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:from-primary/90 hover:to-secondary/90 transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          <ApperIcon name="Plus" className="h-5 w-5 mr-2" />
          {actionText}
        </button>
      )}
    </motion.div>
  );
};

export default Empty;