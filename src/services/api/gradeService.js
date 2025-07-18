import { toast } from "react-toastify";

export const gradeService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { "field": { "Name": "Name" } },
          { "field": { "Name": "assignmentName" } },
          { "field": { "Name": "category" } },
          { "field": { "Name": "score" } },
          { "field": { "Name": "maxScore" } },
          { "field": { "Name": "date" } },
          { "field": { "Name": "studentId" } },
          { "field": { "Name": "classId" } },
          { "field": { "Name": "Tags" } },
          { "field": { "Name": "Owner" } }
        ]
      };

      const response = await apperClient.fetchRecords("grade", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching grades:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { "field": { "Name": "Name" } },
          { "field": { "Name": "assignmentName" } },
          { "field": { "Name": "category" } },
          { "field": { "Name": "score" } },
          { "field": { "Name": "maxScore" } },
          { "field": { "Name": "date" } },
          { "field": { "Name": "studentId" } },
          { "field": { "Name": "classId" } },
          { "field": { "Name": "Tags" } },
          { "field": { "Name": "Owner" } }
        ]
      };

      const response = await apperClient.getRecordById("grade", id, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching grade with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async create(gradeData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: gradeData.assignmentName,
          assignmentName: gradeData.assignmentName,
          category: gradeData.category,
          score: gradeData.score,
          maxScore: gradeData.maxScore,
          date: gradeData.date,
          studentId: gradeData.studentId,
          classId: gradeData.classId,
          Tags: gradeData.Tags || "",
          Owner: gradeData.Owner || null
        }]
      };

      const response = await apperClient.createRecord("grade", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);

        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulRecords.length > 0) {
          return successfulRecords[0].data;
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating grade:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async update(id, gradeData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Id: id,
          Name: gradeData.assignmentName,
          assignmentName: gradeData.assignmentName,
          category: gradeData.category,
          score: gradeData.score,
          maxScore: gradeData.maxScore,
          date: gradeData.date,
          studentId: gradeData.studentId,
          classId: gradeData.classId,
          Tags: gradeData.Tags || "",
          Owner: gradeData.Owner || null
        }]
      };

      const response = await apperClient.updateRecord("grade", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);

        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulUpdates.length > 0) {
          return successfulUpdates[0].data;
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating grade:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [id]
      };

      const response = await apperClient.deleteRecord("grade", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);

        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        return successfulDeletions.length > 0;
      }

      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting grade:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  },

  async updateGrade(studentId, assignmentId, score) {
    try {
      // First, try to find existing grade
      const existingGrades = await this.getAll();
      const existingGrade = existingGrades.find(g => 
        g.studentId === studentId && g.assignmentName === assignmentId
      );

      if (existingGrade) {
        // Update existing grade
        return await this.update(existingGrade.Id, {
          ...existingGrade,
          score: score
        });
      } else {
        // Create new grade
        const newGradeData = {
          assignmentName: assignmentId,
          score: score,
          maxScore: 100, // Default max score
          date: new Date().toISOString().split('T')[0],
          studentId: studentId,
          category: "homework" // Default category
        };
        
        return await this.create(newGradeData);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating grade:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }
};