import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StatCard from "@/components/molecules/StatCard";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { useStudents } from "@/hooks/useStudents";
import { useClasses } from "@/hooks/useClasses";
import { useGrades } from "@/hooks/useGrades";
import { useAttendance } from "@/hooks/useAttendance";
import { format } from "date-fns";

const Dashboard = () => {
  const { students, loading: studentsLoading, error: studentsError } = useStudents();
  const { classes, loading: classesLoading, error: classesError } = useClasses();
  const { grades, loading: gradesLoading, error: gradesError } = useGrades();
  const { attendance, loading: attendanceLoading, error: attendanceError } = useAttendance();

  const [recentActivities, setRecentActivities] = useState([]);

  const loading = studentsLoading || classesLoading || gradesLoading || attendanceLoading;
  const error = studentsError || classesError || gradesError || attendanceError;

useEffect(() => {
    if (grades.length > 0 && attendance.length > 0) {
      const activities = [
        ...grades.slice(-5).map(grade => ({
          id: `grade-${grade.Id || grade.id || Math.random()}`,
          type: "grade",
          description: `Grade updated: ${grade.assignmentName}`,
          date: grade.date,
          icon: "Award"
        })),
        ...attendance.slice(-5).map(record => ({
          id: `attendance-${record.Id || record.id || Math.random()}`,
          type: "attendance",
          description: `Attendance marked: ${record.status}`,
          date: record.date,
          icon: "Calendar"
        }))
      ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
      
      setRecentActivities(activities);
    }
  }, [grades, attendance]);

  const getStats = () => {
    const totalStudents = students.length;
    const totalClasses = classes.length;
    const activeStudents = students.filter(s => s.status === "active").length;
    const todayAttendance = attendance.filter(a => a.date === format(new Date(), "yyyy-MM-dd"));
    const presentToday = todayAttendance.filter(a => a.status === "present").length;
    
    return {
      totalStudents,
      totalClasses,
      activeStudents,
      attendanceRate: todayAttendance.length > 0 ? Math.round((presentToday / todayAttendance.length) * 100) : 0
    };
  };

  const stats = getStats();

  if (loading) return <Loading type="cards" />;
  if (error) return <Error message={error} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening in your classes today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary" size="sm">
            <ApperIcon name="Download" className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm">
            <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
            Quick Add
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon="Users"
          color="primary"
          trend="up"
          trendValue="+12%"
        />
        <StatCard
          title="Active Classes"
          value={stats.totalClasses}
          icon="BookOpen"
          color="success"
          trend="up"
          trendValue="+5%"
        />
        <StatCard
          title="Active Students"
          value={stats.activeStudents}
          icon="UserCheck"
          color="accent"
        />
        <StatCard
          title="Attendance Rate"
          value={`${stats.attendanceRate}%`}
          icon="Calendar"
          color="warning"
          trend={stats.attendanceRate > 85 ? "up" : "down"}
          trendValue={`${stats.attendanceRate > 85 ? "+" : ""}${stats.attendanceRate - 85}%`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Classes</h3>
            <Button variant="ghost" size="sm">
              <ApperIcon name="MoreHorizontal" className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-3">
            {classes.slice(0, 5).map(classItem => (
              <motion.div
                key={classItem.Id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <ApperIcon name="BookOpen" className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{classItem.name}</div>
                    <div className="text-sm text-gray-500">{classItem.subject} • {classItem.period}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {classItem.studentIds?.length || 0} students
                  </div>
                  <div className="text-xs text-gray-500">{classItem.room}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <Button variant="ghost" size="sm">
              <ApperIcon name="MoreHorizontal" className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-3">
            {recentActivities.map(activity => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="h-8 w-8 bg-gradient-to-br from-accent to-yellow-500 rounded-full flex items-center justify-center">
                  <ApperIcon name={activity.icon} className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{activity.description}</div>
                  <div className="text-xs text-gray-500">{format(new Date(activity.date), "MMM d, yyyy")}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Grade Distribution</h3>
          <div className="space-y-3">
            {["A", "B", "C", "D", "F"].map(grade => {
              const count = Math.floor(Math.random() * 20) + 5;
              const percentage = (count / stats.totalStudents) * 100;
              return (
                <div key={grade} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`h-6 w-6 rounded-full bg-grade-${grade.toLowerCase()} flex items-center justify-center`}>
                      <span className="text-xs font-medium text-white">{grade}</span>
                    </div>
                    <span className="text-sm text-gray-600">Grade {grade}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-grade-${grade.toLowerCase()}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="secondary" className="h-16 flex-col">
              <ApperIcon name="UserPlus" className="h-6 w-6 mb-1" />
              <span className="text-xs">Add Student</span>
            </Button>
            <Button variant="secondary" className="h-16 flex-col">
              <ApperIcon name="BookOpen" className="h-6 w-6 mb-1" />
              <span className="text-xs">New Class</span>
            </Button>
            <Button variant="secondary" className="h-16 flex-col">
              <ApperIcon name="Award" className="h-6 w-6 mb-1" />
              <span className="text-xs">Grade Entry</span>
            </Button>
            <Button variant="secondary" className="h-16 flex-col">
              <ApperIcon name="Calendar" className="h-6 w-6 mb-1" />
              <span className="text-xs">Attendance</span>
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
          <div className="space-y-3">
            {classes.slice(0, 4).map(classItem => (
              <div key={classItem.Id} className="flex items-center justify-between p-2 border-l-4 border-primary bg-blue-50">
                <div>
                  <div className="text-sm font-medium text-gray-900">{classItem.name}</div>
                  <div className="text-xs text-gray-500">{classItem.period}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">{classItem.room}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;