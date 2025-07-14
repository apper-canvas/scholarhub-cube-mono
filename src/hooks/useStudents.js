import { useState, useEffect } from "react";
import { studentService } from "@/services/api/studentService";

export const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadStudents = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await studentService.getAll();
      setStudents(data);
    } catch (err) {
      setError(err.message || "Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  const addStudent = async (studentData) => {
    try {
      const newStudent = await studentService.create(studentData);
      setStudents(prev => [...prev, newStudent]);
      return newStudent;
    } catch (err) {
      throw new Error(err.message || "Failed to add student");
    }
  };

  const updateStudent = async (id, studentData) => {
    try {
      const updatedStudent = await studentService.update(id, studentData);
      setStudents(prev => prev.map(student => 
        student.Id === id ? updatedStudent : student
      ));
      return updatedStudent;
    } catch (err) {
      throw new Error(err.message || "Failed to update student");
    }
  };

  const deleteStudent = async (id) => {
    try {
      await studentService.delete(id);
      setStudents(prev => prev.filter(student => student.Id !== id));
    } catch (err) {
      throw new Error(err.message || "Failed to delete student");
    }
  };

  const searchStudents = async (query) => {
    setLoading(true);
    setError("");
    try {
      const data = await studentService.searchByName(query);
      setStudents(data);
    } catch (err) {
      setError(err.message || "Failed to search students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return {
    students,
    loading,
    error,
    loadStudents,
    addStudent,
    updateStudent,
    deleteStudent,
    searchStudents
  };
};