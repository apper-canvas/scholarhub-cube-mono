import { useState, useEffect } from "react";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import { format } from "date-fns";

const StudentForm = ({ student, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    studentId: "",
    dateOfBirth: "",
    enrollmentDate: format(new Date(), "yyyy-MM-dd"),
    gradeLevel: 9,
    status: "active"
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student) {
      setFormData({
        firstName: student.firstName || "",
        lastName: student.lastName || "",
        email: student.email || "",
        studentId: student.studentId || "",
        dateOfBirth: student.dateOfBirth ? format(new Date(student.dateOfBirth), "yyyy-MM-dd") : "",
        enrollmentDate: student.enrollmentDate ? format(new Date(student.enrollmentDate), "yyyy-MM-dd") : "",
        gradeLevel: student.gradeLevel || 9,
        status: student.status || "active"
      });
    }
  }, [student]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.studentId.trim()) newErrors.studentId = "Student ID is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="First Name"
          value={formData.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          error={errors.firstName}
          placeholder="Enter first name"
        />
        
        <FormField
          label="Last Name"
          value={formData.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          error={errors.lastName}
          placeholder="Enter last name"
        />
      </div>

      <FormField
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
        error={errors.email}
        placeholder="Enter email address"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Student ID"
          value={formData.studentId}
          onChange={(e) => handleChange("studentId", e.target.value)}
          error={errors.studentId}
          placeholder="Enter student ID"
        />
        
        <FormField
          label="Grade Level"
          type="select"
          value={formData.gradeLevel}
          onChange={(e) => handleChange("gradeLevel", parseInt(e.target.value))}
        >
          {[9, 10, 11, 12].map(grade => (
            <option key={grade} value={grade}>Grade {grade}</option>
          ))}
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Date of Birth"
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => handleChange("dateOfBirth", e.target.value)}
          error={errors.dateOfBirth}
        />
        
        <FormField
          label="Enrollment Date"
          type="date"
          value={formData.enrollmentDate}
          onChange={(e) => handleChange("enrollmentDate", e.target.value)}
        />
      </div>

      <FormField
        label="Status"
        type="select"
        value={formData.status}
        onChange={(e) => handleChange("status", e.target.value)}
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="graduated">Graduated</option>
      </FormField>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {student ? "Update Student" : "Add Student"}
        </Button>
      </div>
    </form>
  );
};

export default StudentForm;