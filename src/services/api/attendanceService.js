import attendanceData from "@/services/mockData/attendance.json";

let attendance = [...attendanceData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const attendanceService = {
  async getAll() {
    await delay(300);
    return [...attendance];
  },

  async getById(id) {
    await delay(200);
    return attendance.find(record => record.Id === id);
  },

  async create(attendanceData) {
    await delay(400);
    const newRecord = {
      ...attendanceData,
      Id: Math.max(...attendance.map(a => a.Id), 0) + 1
    };
    attendance.push(newRecord);
    return newRecord;
  },

  async update(id, attendanceData) {
    await delay(350);
    const index = attendance.findIndex(record => record.Id === id);
    if (index !== -1) {
      attendance[index] = { ...attendance[index], ...attendanceData };
      return attendance[index];
    }
    throw new Error("Attendance record not found");
  },

  async delete(id) {
    await delay(300);
    const index = attendance.findIndex(record => record.Id === id);
    if (index !== -1) {
      const deletedRecord = attendance.splice(index, 1)[0];
      return deletedRecord;
    }
    throw new Error("Attendance record not found");
  },

  async getByStudentId(studentId) {
    await delay(200);
    return attendance.filter(record => record.studentId === studentId);
  },

  async getByClassId(classId) {
    await delay(200);
    return attendance.filter(record => record.classId === classId);
  },

  async getByDate(date) {
    await delay(200);
    return attendance.filter(record => record.date === date);
  },

  async getByDateRange(startDate, endDate) {
    await delay(200);
    return attendance.filter(record => 
      record.date >= startDate && record.date <= endDate
    );
  },

  async markAttendance(studentId, classId, date, status, notes = "") {
    await delay(350);
    const existingRecord = attendance.find(record =>
      record.studentId === studentId && 
      record.classId === classId && 
      record.date === date
    );

    if (existingRecord) {
      existingRecord.status = status;
      existingRecord.notes = notes;
      return existingRecord;
    }

    const newRecord = {
      Id: Math.max(...attendance.map(a => a.Id), 0) + 1,
      studentId,
      classId,
      date,
      status,
      notes
    };

    attendance.push(newRecord);
    return newRecord;
  }
};