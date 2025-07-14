import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import StudentTable from "@/components/organisms/StudentTable";
import Modal from "@/components/organisms/Modal";
import StudentForm from "@/components/organisms/StudentForm";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { useStudents } from "@/hooks/useStudents";

const Students = () => {
  const { students, loading, error, addStudent, updateStudent, deleteStudent, searchStudents, loadStudents } = useStudents();
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [viewingStudent, setViewingStudent] = useState(null);

  const handleAddStudent = () => {
    setEditingStudent(null);
    setShowModal(true);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setShowModal(true);
  };

  const handleViewStudent = (student) => {
    setViewingStudent(student);
  };

  const handleSubmitStudent = async (studentData) => {
    try {
      if (editingStudent) {
        await updateStudent(editingStudent.Id, studentData);
        toast.success("Student updated successfully!");
      } else {
        await addStudent(studentData);
        toast.success("Student added successfully!");
      }
      setShowModal(false);
      setEditingStudent(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteStudent(id);
        toast.success("Student deleted successfully!");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleSearch = (query) => {
    if (query.trim()) {
      searchStudents(query);
    } else {
      loadStudents();
    }
  };

  const handleExport = () => {
    const csvContent = [
      ["Name", "Email", "Student ID", "Grade", "Status"],
      ...students.map(student => [
        `${student.firstName} ${student.lastName}`,
        student.email,
        student.studentId,
        student.gradeLevel,
        student.status
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students.csv";
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Student data exported successfully!");
  };

  if (loading) return <Loading type="table" />;
  if (error) return <Error message={error} onRetry={loadStudents} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Students
          </h1>
          <p className="text-gray-600 mt-2">Manage your student roster and information</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary" onClick={handleExport}>
            <ApperIcon name="Download" className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleAddStudent}>
            <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search students by name or email..."
            className="flex-1 max-w-md"
          />
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {students.length} student{students.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {students.length === 0 ? (
          <Empty
            title="No students found"
            message="Get started by adding your first student to the system."
            actionText="Add Student"
            onAction={handleAddStudent}
            icon="Users"
          />
        ) : (
          <StudentTable
            students={students}
            onEdit={handleEditStudent}
            onDelete={handleDeleteStudent}
            onView={handleViewStudent}
          />
        )}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingStudent ? "Edit Student" : "Add New Student"}
        size="lg"
      >
        <StudentForm
          student={editingStudent}
          onSubmit={handleSubmitStudent}
          onCancel={() => setShowModal(false)}
        />
      </Modal>

      <Modal
        isOpen={viewingStudent !== null}
        onClose={() => setViewingStudent(null)}
        title="Student Details"
        size="md"
      >
        {viewingStudent && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="h-20 w-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {viewingStudent.firstName[0]}{viewingStudent.lastName[0]}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {viewingStudent.firstName} {viewingStudent.lastName}
                </h3>
                <p className="text-gray-600">{viewingStudent.email}</p>
                <p className="text-sm text-gray-500">ID: {viewingStudent.studentId}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grade Level</label>
                <p className="text-gray-900">Grade {viewingStudent.gradeLevel}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <p className="text-gray-900">{viewingStudent.status}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <p className="text-gray-900">{viewingStudent.dateOfBirth}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Enrollment Date</label>
                <p className="text-gray-900">{viewingStudent.enrollmentDate}</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="secondary" onClick={() => setViewingStudent(null)}>
                Close
              </Button>
              <Button onClick={() => {
                setViewingStudent(null);
                handleEditStudent(viewingStudent);
              }}>
                Edit Student
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Students;