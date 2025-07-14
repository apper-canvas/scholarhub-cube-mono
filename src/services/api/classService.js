import classesData from "@/services/mockData/classes.json";

let classes = [...classesData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const classService = {
  async getAll() {
    await delay(300);
    return [...classes];
  },

  async getById(id) {
    await delay(200);
    return classes.find(classItem => classItem.Id === id);
  },

  async create(classData) {
    await delay(400);
    const newClass = {
      ...classData,
      Id: Math.max(...classes.map(c => c.Id), 0) + 1
    };
    classes.push(newClass);
    return newClass;
  },

  async update(id, classData) {
    await delay(350);
    const index = classes.findIndex(classItem => classItem.Id === id);
    if (index !== -1) {
      classes[index] = { ...classes[index], ...classData };
      return classes[index];
    }
    throw new Error("Class not found");
  },

  async delete(id) {
    await delay(300);
    const index = classes.findIndex(classItem => classItem.Id === id);
    if (index !== -1) {
      const deletedClass = classes.splice(index, 1)[0];
      return deletedClass;
    }
    throw new Error("Class not found");
  },

  async getByTerm(term) {
    await delay(200);
    return classes.filter(classItem => classItem.term === term);
  },

  async getBySubject(subject) {
    await delay(200);
    return classes.filter(classItem => classItem.subject === subject);
  },

  async addStudentToClass(classId, studentId) {
    await delay(300);
    const classItem = classes.find(c => c.Id === classId);
    if (classItem && !classItem.studentIds.includes(studentId)) {
      classItem.studentIds.push(studentId);
      return classItem;
    }
    throw new Error("Class not found or student already enrolled");
  },

  async removeStudentFromClass(classId, studentId) {
    await delay(300);
    const classItem = classes.find(c => c.Id === classId);
    if (classItem) {
      classItem.studentIds = classItem.studentIds.filter(id => id !== studentId);
      return classItem;
    }
    throw new Error("Class not found");
  }
};