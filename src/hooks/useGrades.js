import { useState, useEffect } from "react";
import { gradeService } from "@/services/api/gradeService";

export const useGrades = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadGrades = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await gradeService.getAll();
      setGrades(data);
    } catch (err) {
      setError(err.message || "Failed to load grades");
    } finally {
      setLoading(false);
    }
  };

  const updateGrade = async (studentId, assignmentId, score) => {
    try {
      const updatedGrade = await gradeService.updateGrade(studentId, assignmentId, score);
      setGrades(prev => {
        const existingIndex = prev.findIndex(g => 
          g.studentId === studentId && g.assignmentName === assignmentId
        );
        
        if (existingIndex !== -1) {
          const updated = [...prev];
          updated[existingIndex] = updatedGrade;
          return updated;
        } else {
          return [...prev, updatedGrade];
        }
      });
      return updatedGrade;
    } catch (err) {
      throw new Error(err.message || "Failed to update grade");
    }
  };

  const addGrade = async (gradeData) => {
    try {
      const newGrade = await gradeService.create(gradeData);
      setGrades(prev => [...prev, newGrade]);
      return newGrade;
    } catch (err) {
      throw new Error(err.message || "Failed to add grade");
    }
  };

  const deleteGrade = async (id) => {
    try {
      await gradeService.delete(id);
      setGrades(prev => prev.filter(grade => grade.Id !== id));
    } catch (err) {
      throw new Error(err.message || "Failed to delete grade");
    }
  };

  useEffect(() => {
    loadGrades();
  }, []);

  return {
    grades,
    loading,
    error,
    loadGrades,
    updateGrade,
    addGrade,
    deleteGrade
  };
};