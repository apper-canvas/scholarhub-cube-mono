import { useState, useEffect } from "react";
import { classService } from "@/services/api/classService";

export const useClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadClasses = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await classService.getAll();
      setClasses(data);
    } catch (err) {
      setError(err.message || "Failed to load classes");
    } finally {
      setLoading(false);
    }
  };

  const addClass = async (classData) => {
    try {
      const newClass = await classService.create(classData);
      setClasses(prev => [...prev, newClass]);
      return newClass;
    } catch (err) {
      throw new Error(err.message || "Failed to add class");
    }
  };

  const updateClass = async (id, classData) => {
    try {
      const updatedClass = await classService.update(id, classData);
      setClasses(prev => prev.map(classItem => 
        classItem.Id === id ? updatedClass : classItem
      ));
      return updatedClass;
    } catch (err) {
      throw new Error(err.message || "Failed to update class");
    }
  };

  const deleteClass = async (id) => {
    try {
      await classService.delete(id);
      setClasses(prev => prev.filter(classItem => classItem.Id !== id));
    } catch (err) {
      throw new Error(err.message || "Failed to delete class");
    }
  };

  useEffect(() => {
    loadClasses();
  }, []);

  return {
    classes,
    loading,
    error,
    loadClasses,
    addClass,
    updateClass,
    deleteClass
  };
};