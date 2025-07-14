import { useState } from "react";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import GradeGrid from "@/components/organisms/GradeGrid";
import Modal from "@/components/organisms/Modal";
import FormField from "@/components/molecules/FormField";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { useGrades } from "@/hooks/useGrades";
import { useStudents } from "@/hooks/useStudents";
import { useClasses } from "@/hooks/useClasses";
import assignmentsData from "@/services/mockData/assignments.json";

const Grades = () => {
  const { grades, loading: gradesLoading, error: gradesError, updateGrade, loadGrades } = useGrades();
  const { students, loading: studentsLoading } = useStudents();
  const { classes, loading: classesLoading } = useClasses();
  
  const [selectedClass, setSelectedClass] = useState("");
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [assignments, setAssignments] = useState(assignmentsData);
  const [newAssignment, setNewAssignment] = useState({
    name: "",
    category: "homework",
    maxScore: 100
  });

  const loading = gradesLoading || studentsLoading || classesLoading;
  const error = gradesError;

  const handleGradeUpdate = async (studentId, assignmentId, score) => {
    try {
      await updateGrade(studentId, assignmentId, score);
      toast.success("Grade updated successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAddAssignment = () => {
    setShowAssignmentModal(true);
  };

  const handleSubmitAssignment = (e) => {
    e.preventDefault();
    if (!newAssignment.name.trim()) {
      toast.error("Assignment name is required");
      return;
    }

    const assignment = {
      id: `assignment-${Date.now()}`,
      name: newAssignment.name,
      category: newAssignment.category,
      maxScore: parseInt(newAssignment.maxScore),
      classId: selectedClass,
      date: new Date().toISOString().split('T')[0]
    };

    setAssignments(prev => [...prev, assignment]);
    setNewAssignment({ name: "", category: "homework", maxScore: 100 });
    setShowAssignmentModal(false);
    toast.success("Assignment added successfully!");
  };

  const selectedClassData = classes.find(c => c.Id === parseInt(selectedClass));
  const classStudents = selectedClassData 
    ? students.filter(s => selectedClassData.studentIds.includes(s.Id))
    : [];
  const classAssignments = selectedClass 
    ? assignments.filter(a => a.classId === parseInt(selectedClass))
    : [];

  if (loading) return <Loading type="table" />;
  if (error) return <Error message={error} onRetry={loadGrades} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Grades
          </h1>
          <p className="text-gray-600 mt-2">Manage grades and track student performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-64"
          >
            <option value="">Select a class</option>
            {classes.map(classItem => (
              <option key={classItem.Id} value={classItem.Id}>
                {classItem.name} - {classItem.period}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {!selectedClass ? (
        <Empty
          title="Select a class to view grades"
          message="Choose a class from the dropdown above to start managing grades."
          icon="Award"
        />
      ) : classStudents.length === 0 ? (
        <Empty
          title="No students in this class"
          message="This class doesn't have any enrolled students yet."
          icon="Users"
        />
      ) : (
        <GradeGrid
          grades={grades}
          students={classStudents}
          assignments={classAssignments}
          onGradeUpdate={handleGradeUpdate}
          onAddAssignment={handleAddAssignment}
        />
      )}

      <Modal
        isOpen={showAssignmentModal}
        onClose={() => setShowAssignmentModal(false)}
        title="Add New Assignment"
        size="md"
      >
        <form onSubmit={handleSubmitAssignment} className="space-y-4">
          <FormField
            label="Assignment Name"
            value={newAssignment.name}
            onChange={(e) => setNewAssignment(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter assignment name"
          />
          
          <FormField
            label="Category"
            type="select"
            value={newAssignment.category}
            onChange={(e) => setNewAssignment(prev => ({ ...prev, category: e.target.value }))}
          >
            <option value="homework">Homework</option>
            <option value="quiz">Quiz</option>
            <option value="exam">Exam</option>
            <option value="project">Project</option>
            <option value="participation">Participation</option>
          </FormField>

          <FormField
            label="Max Score"
            type="number"
            value={newAssignment.maxScore}
            onChange={(e) => setNewAssignment(prev => ({ ...prev, maxScore: e.target.value }))}
            min="1"
            max="1000"
          />

          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => setShowAssignmentModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              Add Assignment
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Grades;