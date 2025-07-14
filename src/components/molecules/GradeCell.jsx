import { useState } from "react";
import { cn } from "@/utils/cn";

const GradeCell = ({ 
  value, 
  maxValue = 100, 
  onUpdate, 
  editable = true,
  className 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value?.toString() || "");

  const getGradeColor = (score, max) => {
    if (!score || !max) return "bg-gray-100 text-gray-600";
    const percentage = (score / max) * 100;
    if (percentage >= 90) return "bg-grade-a text-white";
    if (percentage >= 80) return "bg-grade-b text-white";
    if (percentage >= 70) return "bg-grade-c text-white";
    if (percentage >= 60) return "bg-grade-d text-white";
    return "bg-grade-f text-white";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newValue = parseFloat(editValue);
    if (!isNaN(newValue) && newValue >= 0 && newValue <= maxValue) {
      onUpdate(newValue);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setEditValue(value?.toString() || "");
      setIsEditing(false);
    }
  };

  if (isEditing && editable) {
    return (
      <form onSubmit={handleSubmit} className={cn("w-full", className)}>
        <input
          type="number"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSubmit}
          onKeyDown={handleKeyDown}
          className="w-full px-2 py-1 text-center border border-primary rounded focus:outline-none focus:ring-2 focus:ring-primary"
          min="0"
          max={maxValue}
          step="0.1"
          autoFocus
        />
      </form>
    );
  }

  return (
    <div
      className={cn(
        "px-3 py-2 rounded-lg text-center font-medium cursor-pointer transition-all duration-200 hover:shadow-md",
        getGradeColor(value, maxValue),
        !editable && "cursor-default",
        className
      )}
      onClick={() => editable && setIsEditing(true)}
    >
      {value ? `${value}/${maxValue}` : "-"}
    </div>
  );
};

export default GradeCell;