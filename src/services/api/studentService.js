import { toast } from "react-toastify";

export const studentService = {
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
          { "field": { "Name": "firstName" } },
          { "field": { "Name": "lastName" } },
          { "field": { "Name": "email" } },
          { "field": { "Name": "studentId" } },
          { "field": { "Name": "dateOfBirth" } },
          { "field": { "Name": "enrollmentDate" } },
          { "field": { "Name": "gradeLevel" } },
          { "field": { "Name": "status" } },
          { "field": { "Name": "Tags" } },
          { "field": { "Name": "Owner" } }
        ]
      };

      const response = await apperClient.fetchRecords("student", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching students:", error?.response?.data?.message);
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
          { "field": { "Name": "firstName" } },
          { "field": { "Name": "lastName" } },
          { "field": { "Name": "email" } },
          { "field": { "Name": "studentId" } },
          { "field": { "Name": "dateOfBirth" } },
          { "field": { "Name": "enrollmentDate" } },
          { "field": { "Name": "gradeLevel" } },
          { "field": { "Name": "status" } },
          { "field": { "Name": "Tags" } },
          { "field": { "Name": "Owner" } }
        ]
      };

      const response = await apperClient.getRecordById("student", id, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching student with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async create(studentData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: `${studentData.firstName} ${studentData.lastName}`,
          firstName: studentData.firstName,
          lastName: studentData.lastName,
          email: studentData.email,
          studentId: studentData.studentId,
          dateOfBirth: studentData.dateOfBirth,
          enrollmentDate: studentData.enrollmentDate,
          gradeLevel: studentData.gradeLevel.toString(),
          status: studentData.status,
          Tags: studentData.Tags || "",
          Owner: studentData.Owner || null
        }]
      };

      const response = await apperClient.createRecord("student", params);

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
        console.error("Error creating student:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async update(id, studentData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Id: id,
          Name: `${studentData.firstName} ${studentData.lastName}`,
          firstName: studentData.firstName,
          lastName: studentData.lastName,
          email: studentData.email,
          studentId: studentData.studentId,
          dateOfBirth: studentData.dateOfBirth,
          enrollmentDate: studentData.enrollmentDate,
          gradeLevel: studentData.gradeLevel.toString(),
          status: studentData.status,
          Tags: studentData.Tags || "",
          Owner: studentData.Owner || null
        }]
      };

      const response = await apperClient.updateRecord("student", params);

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
        console.error("Error updating student:", error?.response?.data?.message);
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

      const response = await apperClient.deleteRecord("student", params);

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
        console.error("Error deleting student:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  },

  async searchByName(query) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { "field": { "Name": "Name" } },
          { "field": { "Name": "firstName" } },
          { "field": { "Name": "lastName" } },
          { "field": { "Name": "email" } },
          { "field": { "Name": "studentId" } },
          { "field": { "Name": "dateOfBirth" } },
          { "field": { "Name": "enrollmentDate" } },
          { "field": { "Name": "gradeLevel" } },
          { "field": { "Name": "status" } }
        ],
        whereGroups: [{
          operator: "OR",
          subGroups: [
            {
              conditions: [
                {
                  fieldName: "firstName",
                  operator: "Contains",
                  values: [query]
                }
              ]
            },
            {
              conditions: [
                {
                  fieldName: "lastName",
                  operator: "Contains",
                  values: [query]
                }
              ]
            },
            {
              conditions: [
                {
                  fieldName: "email",
                  operator: "Contains",
                  values: [query]
                }
              ]
            }
          ]
        }]
      };

      const response = await apperClient.fetchRecords("student", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error searching students:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async getByGradeLevel(gradeLevel) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { "field": { "Name": "Name" } },
          { "field": { "Name": "firstName" } },
          { "field": { "Name": "lastName" } },
          { "field": { "Name": "email" } },
          { "field": { "Name": "studentId" } },
          { "field": { "Name": "dateOfBirth" } },
          { "field": { "Name": "enrollmentDate" } },
          { "field": { "Name": "gradeLevel" } },
          { "field": { "Name": "status" } }
        ],
        where: [{
          FieldName: "gradeLevel",
          Operator: "EqualTo",
          Values: [gradeLevel.toString()]
        }]
      };

      const response = await apperClient.fetchRecords("student", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching students by grade level:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async getByStatus(status) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { "field": { "Name": "Name" } },
          { "field": { "Name": "firstName" } },
          { "field": { "Name": "lastName" } },
          { "field": { "Name": "email" } },
          { "field": { "Name": "studentId" } },
          { "field": { "Name": "dateOfBirth" } },
          { "field": { "Name": "enrollmentDate" } },
          { "field": { "Name": "gradeLevel" } },
          { "field": { "Name": "status" } }
        ],
        where: [{
          FieldName: "status",
          Operator: "EqualTo",
          Values: [status]
        }]
      };

      const response = await apperClient.fetchRecords("student", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching students by status:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }
};