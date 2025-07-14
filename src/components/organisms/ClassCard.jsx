import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const ClassCard = ({ classData, onEdit, onDelete, onView }) => {
  const studentCount = classData.studentIds?.length || 0;
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 transform translate-x-4 -translate-y-4">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/10 to-secondary/10" />
        </div>
        
        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {classData.name}
              </h3>
              <p className="text-sm text-gray-600">{classData.subject}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onView(classData)}
              >
                <ApperIcon name="Eye" className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(classData)}
              >
                <ApperIcon name="Edit" className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(classData.Id)}
              >
                <ApperIcon name="Trash2" className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Period</p>
              <p className="text-sm font-medium text-gray-900">{classData.period}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Room</p>
              <p className="text-sm font-medium text-gray-900">{classData.room}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ApperIcon name="Users" className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {studentCount} student{studentCount !== 1 ? "s" : ""}
              </span>
            </div>
            <Badge variant="primary">
              {classData.term}
            </Badge>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ClassCard;