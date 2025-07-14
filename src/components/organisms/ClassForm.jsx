import { useState, useEffect } from "react";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";

const ClassForm = ({ classData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    period: "",
    room: "",
    term: "Fall 2024",
    studentIds: []
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (classData) {
      setFormData({
        name: classData.name || "",
        subject: classData.subject || "",
        period: classData.period || "",
        room: classData.room || "",
        term: classData.term || "Fall 2024",
        studentIds: classData.studentIds || []
      });
    }
  }, [classData]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Class name is required";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.period.trim()) newErrors.period = "Period is required";
    if (!formData.room.trim()) newErrors.room = "Room is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        label="Class Name"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
        error={errors.name}
        placeholder="e.g., Advanced Mathematics"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Subject"
          value={formData.subject}
          onChange={(e) => handleChange("subject", e.target.value)}
          error={errors.subject}
          placeholder="e.g., Mathematics"
        />
        
        <FormField
          label="Period"
          value={formData.period}
          onChange={(e) => handleChange("period", e.target.value)}
          error={errors.period}
          placeholder="e.g., 1st Period"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Room"
          value={formData.room}
          onChange={(e) => handleChange("room", e.target.value)}
          error={errors.room}
          placeholder="e.g., Room 101"
        />
        
        <FormField
          label="Term"
          type="select"
          value={formData.term}
          onChange={(e) => handleChange("term", e.target.value)}
        >
          <option value="Fall 2024">Fall 2024</option>
          <option value="Spring 2025">Spring 2025</option>
          <option value="Summer 2025">Summer 2025</option>
        </FormField>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {classData ? "Update Class" : "Add Class"}
        </Button>
      </div>
    </form>
  );
};

export default ClassForm;