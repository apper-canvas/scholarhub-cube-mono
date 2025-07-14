import { toast } from "react-toastify";

export const attendanceService = {
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
          { "field": { "Name": "date" } },
          { "field": { "Name": "status" } },
          { "field": { "Name": "notes" } },
          { "field": { "Name": "studentId" } },
          { "field": { "Name": "classId" } },
          { "field": { "Name": "Tags" } },
          { "field": { "Name": "Owner" } }
        ]
      };

      const response = await apperClient.fetchRecords("attendance", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching attendance:", error?.response?.data?.message);
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
          { "field": { "Name": "date" } },
          { "field": { "Name": "status" } },
          { "field": { "Name": "notes" } },
          { "field": { "Name": "studentId" } },
          { "field": { "Name": "classId" } },
          { "field": { "Name": "Tags" } },
          { "field": { "Name": "Owner" } }
        ]
      };

      const response = await apperClient.getRecordById("attendance", id, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching attendance record with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async create(attendanceData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: `Attendance ${attendanceData.date}`,
          date: attendanceData.date,
          status: attendanceData.status,
          notes: attendanceData.notes || "",
          studentId: attendanceData.studentId,
          classId: attendanceData.classId,
          Tags: attendanceData.Tags || "",
          Owner: attendanceData.Owner || null
        }]
      };

      const response = await apperClient.createRecord("attendance", params);

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
        console.error("Error creating attendance record:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async update(id, attendanceData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Id: id,
          Name: `Attendance ${attendanceData.date}`,
          date: attendanceData.date,
          status: attendanceData.status,
          notes: attendanceData.notes || "",
          studentId: attendanceData.studentId,
          classId: attendanceData.classId,
          Tags: attendanceData.Tags || "",
          Owner: attendanceData.Owner || null
        }]
      };

      const response = await apperClient.updateRecord("attendance", params);

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
        console.error("Error updating attendance record:", error?.response?.data?.message);
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

      const response = await apperClient.deleteRecord("attendance", params);

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
        console.error("Error deleting attendance record:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  },

  async markAttendance(studentId, classId, date, status, notes = "") {
    try {
      // First, check if a record already exists
      const existingRecords = await this.getAll();
      const existingRecord = existingRecords.find(record =>
        record.studentId === studentId && 
        record.classId === classId && 
        record.date === date
      );

      if (existingRecord) {
        // Update existing record
        return await this.update(existingRecord.Id, {
          ...existingRecord,
          status: status,
          notes: notes
        });
      } else {
        // Create new record
        const newRecordData = {
          studentId,
          classId,
          date,
          status,
          notes
        };
        
        return await this.create(newRecordData);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error marking attendance:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }
};