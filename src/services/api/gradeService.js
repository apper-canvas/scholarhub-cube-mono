import gradesData from "@/services/mockData/grades.json";

let grades = [...gradesData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const gradeService = {
  async getAll() {
    await delay(300);
    return [...grades];
  },

  async getById(id) {
    await delay(200);
    return grades.find(grade => grade.Id === id);
  },

  async create(gradeData) {
    await delay(400);
    const newGrade = {
      ...gradeData,
      Id: Math.max(...grades.map(g => g.Id), 0) + 1
    };
    grades.push(newGrade);
    return newGrade;
  },

  async update(id, gradeData) {
    await delay(350);
    const index = grades.findIndex(grade => grade.Id === id);
    if (index !== -1) {
      grades[index] = { ...grades[index], ...gradeData };
      return grades[index];
    }
    throw new Error("Grade not found");
  },

  async delete(id) {
    await delay(300);
    const index = grades.findIndex(grade => grade.Id === id);
    if (index !== -1) {
      const deletedGrade = grades.splice(index, 1)[0];
      return deletedGrade;
    }
    throw new Error("Grade not found");
  },

  async getByStudentId(studentId) {
    await delay(200);
    return grades.filter(grade => grade.studentId === studentId);
  },

  async getByClassId(classId) {
    await delay(200);
    return grades.filter(grade => grade.classId === classId);
  },

  async getByStudentAndClass(studentId, classId) {
    await delay(200);
    return grades.filter(grade => 
      grade.studentId === studentId && grade.classId === classId
    );
  },

  async updateGrade(studentId, assignmentId, score) {
    await delay(350);
    const grade = grades.find(g => 
      g.studentId === studentId && g.assignmentName === assignmentId
    );
    
    if (grade) {
      grade.score = score;
      return grade;
    }
    
    // Create new grade if it doesn't exist
    const newGrade = {
      Id: Math.max(...grades.map(g => g.Id), 0) + 1,
      studentId,
      assignmentName: assignmentId,
      score,
      maxScore: 100, // Default max score
      date: new Date().toISOString().split('T')[0]
    };
    
    grades.push(newGrade);
    return newGrade;
  }
};