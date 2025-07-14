import { useState } from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import GradeCell from "@/components/molecules/GradeCell";
import ApperIcon from "@/components/ApperIcon";

const GradeGrid = ({ grades, students, assignments, onGradeUpdate, onAddAssignment }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "exam", "quiz", "homework", "project", "participation"];

  const filteredAssignments = selectedCategory === "all" 
    ? assignments 
    : assignments.filter(a => a.category === selectedCategory);

  const getGrade = (studentId, assignmentId) => {
    return grades.find(g => g.studentId === studentId && g.assignmentId === assignmentId);
  };

  const getStudentAverage = (studentId) => {
    const studentGrades = grades.filter(g => g.studentId === studentId);
    if (studentGrades.length === 0) return null;
    
    const total = studentGrades.reduce((sum, grade) => {
      const assignment = assignments.find(a => a.id === grade.assignmentId);
      return sum + (grade.score / assignment.maxScore) * 100;
    }, 0);
    
    return Math.round(total / studentGrades.length);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Grade Entry</h2>
        <div className="flex items-center space-x-4">
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-48"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </Select>
          <Button onClick={onAddAssignment}>
            <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
            Add Assignment
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left p-3 bg-gray-50 font-medium text-gray-900 min-w-[200px]">
                Student
              </th>
              {filteredAssignments.map(assignment => (
                <th key={assignment.id} className="text-center p-3 bg-gray-50 font-medium text-gray-900 min-w-[120px]">
                  <div>
                    <div className="text-sm">{assignment.name}</div>
                    <div className="text-xs text-gray-500">/{assignment.maxScore}</div>
                  </div>
                </th>
              ))}
              <th className="text-center p-3 bg-gray-50 font-medium text-gray-900 min-w-[100px]">
                Average
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.Id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-3 font-medium text-gray-900">
                  {student.firstName} {student.lastName}
                </td>
                {filteredAssignments.map(assignment => {
                  const grade = getGrade(student.Id, assignment.id);
                  return (
                    <td key={assignment.id} className="p-3 text-center">
                      <GradeCell
                        value={grade?.score}
                        maxValue={assignment.maxScore}
                        onUpdate={(newScore) => onGradeUpdate(student.Id, assignment.id, newScore)}
                      />
                    </td>
                  );
                })}
                <td className="p-3 text-center">
                  <div className="px-3 py-2 bg-gray-100 rounded-lg font-medium text-gray-900">
                    {getStudentAverage(student.Id) || "-"}%
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default GradeGrid;