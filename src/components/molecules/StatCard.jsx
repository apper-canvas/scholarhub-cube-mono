import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue, 
  color = "primary",
  className 
}) => {
  const colorClasses = {
    primary: "from-primary to-secondary",
    success: "from-success to-green-600",
    warning: "from-warning to-yellow-600",
    error: "from-error to-red-600",
    accent: "from-accent to-yellow-500"
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={cn("p-6 relative overflow-hidden", className)}>
        <div className="absolute top-0 right-0 w-20 h-20 transform translate-x-6 -translate-y-6">
          <div className={cn("w-full h-full rounded-full bg-gradient-to-br opacity-10", colorClasses[color])} />
        </div>
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
            <div className={cn("p-2 rounded-lg bg-gradient-to-br text-white", colorClasses[color])}>
              <ApperIcon name={icon} className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              {trend && (
                <div className="flex items-center mt-1">
                  <ApperIcon 
                    name={trend === "up" ? "TrendingUp" : "TrendingDown"} 
                    className={cn("h-4 w-4 mr-1", trend === "up" ? "text-success" : "text-error")} 
                  />
                  <span className={cn("text-sm font-medium", trend === "up" ? "text-success" : "text-error")}>
                    {trendValue}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default StatCard;