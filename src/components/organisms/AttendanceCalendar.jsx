import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from "date-fns";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const AttendanceCalendar = ({ attendance, students, onMarkAttendance }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getAttendanceForDate = (date) => {
    return attendance.filter(a => isSameDay(new Date(a.date), date));
  };

  const getAttendanceStats = (date) => {
    const dayAttendance = getAttendanceForDate(date);
    const present = dayAttendance.filter(a => a.status === "present").length;
    const absent = dayAttendance.filter(a => a.status === "absent").length;
    const late = dayAttendance.filter(a => a.status === "late").length;
    
    return { present, absent, late, total: dayAttendance.length };
  };

  const selectedDateAttendance = getAttendanceForDate(selectedDate);
  const selectedStats = getAttendanceStats(selectedDate);

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "present": return "success";
      case "absent": return "error";
      case "late": return "warning";
      default: return "default";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {format(currentDate, "MMMM yyyy")}
            </h2>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth(-1)}
              >
                <ApperIcon name="ChevronLeft" className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth(1)}
              >
                <ApperIcon name="ChevronRight" className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {daysInMonth.map(day => {
              const stats = getAttendanceStats(day);
              const isSelected = isSameDay(day, selectedDate);
              const isTodayDay = isToday(day);
              
              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(day)}
                  className={cn(
                    "p-2 text-sm rounded-lg transition-all duration-200 hover:bg-gray-100",
                    isSelected && "bg-primary text-white hover:bg-primary/90",
                    isTodayDay && !isSelected && "bg-blue-50 text-blue-600",
                    stats.total > 0 && !isSelected && "bg-gray-50"
                  )}
                >
                  <div className="text-center">
                    <div className="font-medium">{format(day, "d")}</div>
                    {stats.total > 0 && (
                      <div className="flex justify-center space-x-1 mt-1">
                        {stats.present > 0 && (
                          <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
                        )}
                        {stats.absent > 0 && (
                          <div className="w-1.5 h-1.5 bg-error rounded-full"></div>
                        )}
                        {stats.late > 0 && (
                          <div className="w-1.5 h-1.5 bg-warning rounded-full"></div>
                        )}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </Card>
      </div>

      <div>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {format(selectedDate, "MMM d, yyyy")}
            </h3>
            <Button
              size="sm"
              onClick={() => onMarkAttendance(selectedDate)}
            >
              <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
              Mark
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="text-center p-3 bg-success/10 rounded-lg">
              <div className="text-2xl font-bold text-success">{selectedStats.present}</div>
              <div className="text-xs text-gray-600">Present</div>
            </div>
            <div className="text-center p-3 bg-error/10 rounded-lg">
              <div className="text-2xl font-bold text-error">{selectedStats.absent}</div>
              <div className="text-xs text-gray-600">Absent</div>
            </div>
            <div className="text-center p-3 bg-warning/10 rounded-lg">
              <div className="text-2xl font-bold text-warning">{selectedStats.late}</div>
              <div className="text-xs text-gray-600">Late</div>
            </div>
          </div>

          <div className="space-y-3">
            {selectedDateAttendance.map(record => {
              const student = students.find(s => s.Id === record.studentId);
              return (
                <div key={record.Id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-white">
                        {student?.firstName[0]}{student?.lastName[0]}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {student?.firstName} {student?.lastName}
                      </div>
                      {record.notes && (
                        <div className="text-xs text-gray-500">{record.notes}</div>
                      )}
                    </div>
                  </div>
                  <Badge variant={getStatusColor(record.status)}>
                    {record.status}
                  </Badge>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AttendanceCalendar;