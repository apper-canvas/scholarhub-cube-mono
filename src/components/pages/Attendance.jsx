import { useState } from "react";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import AttendanceCalendar from "@/components/organisms/AttendanceCalendar";
import Modal from "@/components/organisms/Modal";
import FormField from "@/components/molecules/FormField";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { useAttendance } from "@/hooks/useAttendance";
import { useStudents } from "@/hooks/useStudents";
import { useClasses } from "@/hooks/useClasses";
import { format } from "date-fns";

const Attendance = () => {
  const { attendance, loading: attendanceLoading, error: attendanceError, markAttendance, loadAttendance } = useAttendance();
  const { students, loading: studentsLoading } = useStudents();
  const { classes, loading: classesLoading } = useClasses();
  
  const [selectedClass, setSelectedClass] = useState("");
  const [showMarkModal, setShowMarkModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [attendanceData, setAttendanceData] = useState({});

  const loading = attendanceLoading || studentsLoading || classesLoading;
  const error = attendanceError;

  const handleMarkAttendance = (date) => {
    setSelectedDate(date);
    setShowMarkModal(true);
    
    // Initialize attendance data for the selected date
    const selectedClassData = classes.find(c => c.Id === parseInt(selectedClass));
    if (selectedClassData) {
      const initialData = {};
      selectedClassData.studentIds.forEach(studentId => {
        const existingRecord = attendance.find(a => 
          a.studentId === studentId && 
          a.date === format(date, "yyyy-MM-dd")
        );
        initialData[studentId] = existingRecord?.status || "present";
      });
      setAttendanceData(initialData);
    }
  };

  const handleSubmitAttendance = async () => {
    try {
      const selectedClassData = classes.find(c => c.Id === parseInt(selectedClass));
      if (!selectedClassData) return;

      const promises = selectedClassData.studentIds.map(studentId => 
        markAttendance(
          studentId,
          selectedClassData.Id,
          format(selectedDate, "yyyy-MM-dd"),
          attendanceData[studentId] || "present"
        )
      );

      await Promise.all(promises);
      setShowMarkModal(false);
      toast.success("Attendance marked successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const selectedClassData = classes.find(c => c.Id === parseInt(selectedClass));
  const classStudents = selectedClassData 
    ? students.filter(s => selectedClassData.studentIds.includes(s.Id))
    : [];
  const classAttendance = selectedClass 
    ? attendance.filter(a => a.classId === parseInt(selectedClass))
    : [];

  if (loading) return <Loading type="cards" />;
  if (error) return <Error message={error} onRetry={loadAttendance} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Attendance
          </h1>
          <p className="text-gray-600 mt-2">Track student attendance and participation</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-64"
          >
            <option value="">Select a class</option>
            {classes.map(classItem => (
              <option key={classItem.Id} value={classItem.Id}>
                {classItem.name} - {classItem.period}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {!selectedClass ? (
        <Empty
          title="Select a class to view attendance"
          message="Choose a class from the dropdown above to start tracking attendance."
          icon="Calendar"
        />
      ) : classStudents.length === 0 ? (
        <Empty
          title="No students in this class"
          message="This class doesn't have any enrolled students yet."
          icon="Users"
        />
      ) : (
        <AttendanceCalendar
          attendance={classAttendance}
          students={classStudents}
          onMarkAttendance={handleMarkAttendance}
        />
      )}

      <Modal
        isOpen={showMarkModal}
        onClose={() => setShowMarkModal(false)}
        title={`Mark Attendance - ${selectedDate ? format(selectedDate, "MMM d, yyyy") : ""}`}
        size="md"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto">
            {classStudents.map(student => (
              <div key={student.Id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {student.firstName[0]}{student.lastName[0]}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {student.firstName} {student.lastName}
                    </div>
                    <div className="text-sm text-gray-500">{student.studentId}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {["present", "absent", "late"].map(status => (
                    <button
                      key={status}
                      onClick={() => setAttendanceData(prev => ({ ...prev, [student.Id]: status }))}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        attendanceData[student.Id] === status
                          ? status === "present" 
                            ? "bg-success text-white"
                            : status === "absent"
                            ? "bg-error text-white"
                            : "bg-warning text-white"
                          : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              variant="secondary" 
              onClick={() => setShowMarkModal(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmitAttendance}>
              Save Attendance
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Attendance;