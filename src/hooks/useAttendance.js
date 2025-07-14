import { useState, useEffect } from "react";
import { attendanceService } from "@/services/api/attendanceService";

export const useAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadAttendance = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await attendanceService.getAll();
      setAttendance(data);
    } catch (err) {
      setError(err.message || "Failed to load attendance");
    } finally {
      setLoading(false);
    }
  };

  const markAttendance = async (studentId, classId, date, status, notes = "") => {
    try {
      const record = await attendanceService.markAttendance(studentId, classId, date, status, notes);
      setAttendance(prev => {
        const existingIndex = prev.findIndex(a => 
          a.studentId === studentId && a.classId === classId && a.date === date
        );
        
        if (existingIndex !== -1) {
          const updated = [...prev];
          updated[existingIndex] = record;
          return updated;
        } else {
          return [...prev, record];
        }
      });
      return record;
    } catch (err) {
      throw new Error(err.message || "Failed to mark attendance");
    }
  };

  const updateAttendance = async (id, attendanceData) => {
    try {
      const updatedRecord = await attendanceService.update(id, attendanceData);
      setAttendance(prev => prev.map(record => 
        record.Id === id ? updatedRecord : record
      ));
      return updatedRecord;
    } catch (err) {
      throw new Error(err.message || "Failed to update attendance");
    }
  };

  const deleteAttendance = async (id) => {
    try {
      await attendanceService.delete(id);
      setAttendance(prev => prev.filter(record => record.Id !== id));
    } catch (err) {
      throw new Error(err.message || "Failed to delete attendance");
    }
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  return {
    attendance,
    loading,
    error,
    loadAttendance,
    markAttendance,
    updateAttendance,
    deleteAttendance
  };
};