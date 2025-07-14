import studentsData from "@/services/mockData/students.json";

let students = [...studentsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const studentService = {
  async getAll() {
    await delay(300);
    return [...students];
  },

  async getById(id) {
    await delay(200);
    return students.find(student => student.Id === id);
  },

  async create(studentData) {
    await delay(400);
    const newStudent = {
      ...studentData,
      Id: Math.max(...students.map(s => s.Id), 0) + 1
    };
    students.push(newStudent);
    return newStudent;
  },

  async update(id, studentData) {
    await delay(350);
    const index = students.findIndex(student => student.Id === id);
    if (index !== -1) {
      students[index] = { ...students[index], ...studentData };
      return students[index];
    }
    throw new Error("Student not found");
  },

  async delete(id) {
    await delay(300);
    const index = students.findIndex(student => student.Id === id);
    if (index !== -1) {
      const deletedStudent = students.splice(index, 1)[0];
      return deletedStudent;
    }
    throw new Error("Student not found");
  },

  async searchByName(query) {
    await delay(250);
    const searchTerm = query.toLowerCase();
    return students.filter(student =>
      student.firstName.toLowerCase().includes(searchTerm) ||
      student.lastName.toLowerCase().includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm)
    );
  },

  async getByGradeLevel(gradeLevel) {
    await delay(200);
    return students.filter(student => student.gradeLevel === gradeLevel);
  },

  async getByStatus(status) {
    await delay(200);
    return students.filter(student => student.status === status);
  }
};